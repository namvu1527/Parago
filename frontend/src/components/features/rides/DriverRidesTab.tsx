import React, { useState, useMemo } from "react";
import { RideCard } from "@/components/ui/RideCard";
import { IconAlertCircle, IconPlus } from "@tabler/icons-react";
import { PassengersModal } from "./PassengersModal";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

import { ReviewModal } from "@/components/rides/ReviewModal";

interface DriverRidesTabProps {
  rides: any[];
  loading: boolean;
  onRefresh: () => void;
}

type SubFilter = "ALL" | "OPEN" | "FULL" | "COMPLETED" | "CANCELLED";

export const DriverRidesTab: React.FC<DriverRidesTabProps> = ({ rides, loading, onRefresh }) => {
  const [filter, setFilter] = useState<SubFilter>("ALL");
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState<any>(null);

  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      const acceptedCount = ride.passengers?.filter((p: any) => p.status === "ACCEPTED").length || 0;
      const isFull = acceptedCount >= ride.seatsAvailable;
      
      if (filter === "OPEN") return ride.status === "PENDING" && !isFull;
      if (filter === "FULL") return ride.status === "PENDING" && isFull;
      if (filter === "COMPLETED") return ride.status === "COMPLETED";
      if (filter === "CANCELLED") return ride.status === "CANCELLED";
      return true;
    });
  }, [rides, filter]);

  const handleCancel = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn huỷ chuyến đi này? Hành khách sẽ được thông báo.")) return;
    try {
      await apiClient.patch(`/rides/${id}/cancel`);
      toast.success("Đã huỷ chuyến đi");
      onRefresh();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể huỷ chuyến đi");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá chuyến đi này vĩnh viễn?")) return;
    try {
      await apiClient.delete(`/rides/${id}`);
      toast.success("Đã xoá chuyến đi");
      onRefresh();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể xoá chuyến đi");
    }
  };

  const filters: { label: string; value: SubFilter }[] = [
    { label: "Tất cả", value: "ALL" },
    { label: "Đang mở", value: "OPEN" },
    { label: "Đã đủ chỗ", value: "FULL" },
    { label: "Đã hoàn thành", value: "COMPLETED" },
    { label: "Đã huỷ", value: "CANCELLED" },
  ];

  if (loading && rides.length === 0) {
    return <div className="text-center py-10 text-[var(--text-muted)] animate-pulse">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Link href="/rides/create" className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-semibold py-3 rounded-xl hover:bg-primary-600 transition-colors">
            <IconPlus size={20} />
            Tạo chuyến đi
          </button>
        </Link>
        <Link href="/rides/bulk-create" className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-200 text-[var(--text-primary)] font-semibold py-3 rounded-xl border border-border hover:bg-surface-200 transition-colors">
            <IconPlus size={20} />
            Tạo từ TKB
          </button>
        </Link>
      </div>

      {/* Sub-filters */}
      {rides.length > 0 && (
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-surface-100 dark:bg-surface-200 text-[var(--text-secondary)] hover:bg-surface-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredRides.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-surface-50 dark:bg-surface-100 rounded-3xl border border-border">
          <div className="w-16 h-16 rounded-full bg-surface-200 flex items-center justify-center text-surface-500 mb-4">
            <IconAlertCircle size={32} />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-heading)] mb-2">Không tìm thấy chuyến đi</h3>
          <p className="text-sm text-[var(--text-muted)] max-w-sm mb-6">
            Bạn chưa đăng chuyến đi nào {filter !== "ALL" ? "với trạng thái này" : ""}.
          </p>
          <Link
            href="/rides/create"
            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl font-medium hover:brightness-110 transition-all"
          >
            <IconPlus size={20} />
            Đăng chuyến ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRides.map((ride, idx) => {
            const acceptedCount = ride.passengers?.filter((p: any) => p.status === "ACCEPTED").length || 0;
            const pendingCount = ride.passengers?.filter((p: any) => p.status === "PENDING").length || 0;
            const isFull = acceptedCount >= ride.seatsAvailable;
            const hasAccepted = acceptedCount > 0;

            let badgeStatus = ride.status;
            let badgeText = "Đang mở";
            let badgeColor = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

            if (ride.status === "COMPLETED") {
              badgeText = "Hoàn thành";
              badgeColor = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            } else if (ride.status === "CANCELLED") {
              badgeText = "Đã huỷ";
              badgeColor = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            } else if (isFull) {
              badgeText = "Đầy chỗ";
              badgeColor = "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
            }

            return (
              <div key={ride.id} className="relative group">
                <RideCard 
                  ride={ride} 
                  index={idx} 
                  showAction={false}
                />
                
                {/* Overlays / Custom infos for driver */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${badgeColor}`}>
                    {badgeText}
                  </span>
                  <div className="text-xs font-medium text-[var(--text-secondary)] bg-surface-100 dark:bg-surface-200 px-2 py-1 rounded-lg">
                    {ride.seatsAvailable - acceptedCount}/{ride.seatsAvailable} chỗ trống
                  </div>
                </div>

                <div className="mt-2 bg-surface-50 dark:bg-surface-100 rounded-2xl p-3 border border-border flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedRideId(ride.id)}
                    className="flex-1 min-w-[120px] relative flex justify-center items-center gap-2 bg-[var(--color-primary)] text-white py-2 rounded-xl text-sm font-medium hover:brightness-110 transition-all"
                  >
                    Xem hành khách
                    {pendingCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full animate-pulse shadow-sm">
                        {pendingCount}
                      </span>
                    )}
                  </button>
                  
                  {ride.status === "PENDING" && (
                    <>
                      <button 
                        onClick={() => handleCancel(ride.id)}
                        className="flex-1 min-w-[100px] flex justify-center items-center py-2 bg-surface-200 dark:bg-surface-300 text-[var(--text-heading)] rounded-xl text-sm font-medium hover:bg-surface-300 transition-all"
                      >
                        Huỷ chuyến
                      </button>
                      <button 
                        onClick={async () => {
                          if (!confirm("Xác nhận hoàn thành chuyến đi này?")) return;
                          try {
                            await apiClient.patch(`/rides/${ride.id}/complete`);
                            toast.success("Chuyến đi đã hoàn thành");
                            onRefresh();
                          } catch (err: any) {
                            toast.error(err.response?.data?.message || "Không thể hoàn thành chuyến đi");
                          }
                        }}
                        className="flex-1 min-w-[100px] flex justify-center items-center py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-all"
                      >
                        Hoàn thành
                      </button>
                    </>
                  )}
                  
                  {ride.status === "PENDING" && !hasAccepted && (
                    <button 
                      onClick={() => handleDelete(ride.id)}
                      className="flex-none px-4 flex justify-center items-center py-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                      Xoá
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedRideId && (
        <PassengersModal
          rideId={selectedRideId}
          rideStatus={rides.find(r => r.id === selectedRideId)?.status}
          passengers={rides.find(r => r.id === selectedRideId)?.passengers || []}
          reviews={rides.find(r => r.id === selectedRideId)?.reviews || []}
          totalSeats={rides.find(r => r.id === selectedRideId)?.seatsAvailable || 0}
          onClose={() => setSelectedRideId(null)}
          onUpdate={onRefresh}
          onReview={(passenger) => {
            setReviewData({
              rideId: selectedRideId,
              revieweeId: passenger.id,
              revieweeName: passenger.name,
              revieweeAvatar: passenger.avatarUrl,
            });
          }}
        />
      )}

      {reviewData && (
        <ReviewModal
          isOpen={!!reviewData}
          onClose={() => setReviewData(null)}
          rideId={reviewData.rideId}
          revieweeId={reviewData.revieweeId}
          revieweeName={reviewData.revieweeName}
          revieweeAvatar={reviewData.revieweeAvatar}
          onSuccess={onRefresh}
        />
      )}
    </div>
  );
}
