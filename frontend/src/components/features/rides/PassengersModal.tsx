import React, { useState } from "react";
import { IconX, IconCheck, IconPhone, IconMessage } from "@tabler/icons-react";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PassengersModalProps {
  rideId: string;
  rideStatus?: string;
  passengers: any[];
  reviews?: any[];
  totalSeats: number;
  onClose: () => void;
  onUpdate: () => void;
  onReview?: (passenger: any) => void;
}

export const PassengersModal: React.FC<PassengersModalProps> = ({ rideId, rideStatus, passengers, reviews, totalSeats, onClose, onUpdate, onReview }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (passengerId: string, action: "ACCEPT" | "REJECT") => {
    setLoadingId(passengerId);
    try {
      await apiClient.patch(`/rides/${rideId}/passengers/${passengerId}`, { action });
      toast.success(action === "ACCEPT" ? "Đã chấp nhận hành khách" : "Đã từ chối hành khách");
      onUpdate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể thực hiện hành động này");
    } finally {
      setLoadingId(null);
    }
  };

  const acceptedCount = passengers.filter(p => p.status === "ACCEPTED").length;
  const isFull = acceptedCount >= totalSeats;

  // Sắp xếp: PENDING lên đầu, ACCEPTED sau
  const sortedPassengers = [...passengers]
    .filter(p => p.status === "PENDING" || p.status === "ACCEPTED")
    .sort((a, b) => {
      if (a.status === "PENDING" && b.status !== "PENDING") return -1;
      if (a.status !== "PENDING" && b.status === "PENDING") return 1;
      return 0;
    });

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-0">
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full sm:w-[500px] bg-white dark:bg-surface-50 rounded-3xl overflow-hidden flex flex-col max-h-[85vh] shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-heading)]">Danh sách hành khách</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Đã duyệt: <span className="font-semibold text-[var(--color-primary)]">{acceptedCount}/{totalSeats}</span> chỗ
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-100 flex items-center justify-center text-[var(--text-secondary)] hover:bg-surface-200 transition-colors"
          >
            <IconX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {sortedPassengers.length === 0 ? (
            <div className="text-center py-10 text-[var(--text-muted)]">
              Chưa có yêu cầu ghép chuyến nào.
            </div>
          ) : (
            <div className="space-y-4">
              {sortedPassengers.map((p) => (
                <div key={p.id} className="flex flex-col gap-3 p-4 bg-surface-50 dark:bg-surface-100 border border-border rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-surface-200 overflow-hidden shrink-0">
                      {p.passenger?.avatarUrl ? (
                        <Image 
                          src={p.passenger.avatarUrl} 
                          alt={p.passenger.name} 
                          width={48} 
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-surface-500 bg-surface-200">
                          {p.passenger?.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[var(--text-heading)] truncate">
                        {p.passenger?.name || "Người dùng ẩn danh"}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                        ⭐ {p.passenger?.rating || "5.0"} • {p.passenger?.university || "Chưa có TT"}
                      </p>
                    </div>
                    
                    {p.status === "ACCEPTED" && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold rounded-lg whitespace-nowrap">
                        ĐÃ DUYỆT
                      </span>
                    )}
                    {p.status === "PENDING" && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-[10px] font-bold rounded-lg whitespace-nowrap">
                        CHỜ DUYỆT
                      </span>
                    )}
                  </div>

                  {p.status === "PENDING" && (
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleAction(p.id, "REJECT")}
                        disabled={loadingId === p.id}
                        className="flex-1 flex justify-center items-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 text-sm font-semibold transition-all disabled:opacity-50"
                      >
                        <IconX size={18} />
                        Từ chối
                      </button>
                      <button
                        onClick={() => handleAction(p.id, "ACCEPT")}
                        disabled={loadingId === p.id || isFull}
                        className="flex-1 flex justify-center items-center gap-1.5 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 text-sm font-semibold transition-all disabled:opacity-50"
                      >
                        <IconCheck size={18} />
                        Duyệt
                      </button>
                    </div>
                  )}

                  {p.status === "ACCEPTED" && (
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => router.push(`/messages`)}
                        className="flex-1 flex justify-center items-center gap-1.5 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold transition-all hover:brightness-110"
                      >
                        <IconMessage size={18} />
                        Nhắn tin
                      </button>
                      
                      {rideStatus === "COMPLETED" && (
                        reviews?.some((r: any) => r.revieweeId === p.passenger?.id) ? (
                          <div className="flex-1 flex justify-center items-center py-2 bg-surface-100 text-[var(--text-muted)] rounded-xl text-sm font-medium">
                            Đã đánh giá ✓
                          </div>
                        ) : (
                          <button
                            onClick={() => onReview?.(p.passenger)}
                            className="flex-1 flex justify-center items-center gap-1.5 py-2 rounded-xl bg-[var(--color-gold-500)] text-white text-sm font-semibold transition-all hover:brightness-110"
                          >
                            Đánh giá
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
