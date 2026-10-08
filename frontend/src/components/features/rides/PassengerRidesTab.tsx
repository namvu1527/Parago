import React, { useState, useMemo } from "react";
import { RideCard } from "@/components/ui/RideCard";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

import { ReviewModal } from "@/components/rides/ReviewModal";

interface PassengerRidesTabProps {
  rides: any[];
  loading: boolean;
  onRefresh: () => void;
}

type SubFilter = "ALL" | "PENDING" | "ACCEPTED" | "REJECTED";

export const PassengerRidesTab: React.FC<PassengerRidesTabProps> = ({ rides, loading, onRefresh }) => {
  const [filter, setFilter] = useState<SubFilter>("ALL");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();
  React.useEffect(() => { 
    apiClient.get("/rides/suggested-by-schedules").then(res => setSuggestions(res.data)).catch(console.error); 
  }, []);

  const [reviewData, setReviewData] = useState<any>(null);

  const filteredRides = useMemo(() => {
    if (filter === "ALL") return rides;
    return rides.filter((ride) => ride.myRequestStatus === filter);
  }, [rides, filter]);

  const handleCancelRequest = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn huỷ yêu cầu ghép chuyến này?")) return;
    try {
      await apiClient.delete(`/rides/${id}/request-join`);
      toast.success("Đã huỷ yêu cầu ghép chuyến");
      onRefresh();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể huỷ yêu cầu");
    }
  };

  const filters: { label: string; value: SubFilter }[] = [
    { label: "Tất cả", value: "ALL" },
    { label: "Chờ duyệt", value: "PENDING" },
    { label: "Đã duyệt", value: "ACCEPTED" },
    { label: "Bị từ chối", value: "REJECTED" },
  ];

  if (loading && rides.length === 0) {
    return <div className="text-center py-10 text-[var(--text-muted)] animate-pulse">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-4">
      {suggestions.length > 0 && filter === "ALL" && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📅</span>
            <h3 className="text-lg font-bold text-[var(--text-heading)]">Gợi ý theo TKB tuần này</h3>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {suggestions.map(s => (
              <div key={s.id} className="min-w-[280px]" onClick={() => router.push(`/rides/${s.id}`)}>
                <RideCard ride={s} index={0} showAction={false} />
              </div>
            ))}
          </div>
        </div>
      )}
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
            <IconSearch size={32} />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-heading)] mb-2">Chưa có ghép chuyến nào</h3>
          <p className="text-sm text-[var(--text-muted)] max-w-sm mb-6">
            Bạn chưa gửi yêu cầu ghép chuyến nào {filter !== "ALL" ? "với trạng thái này" : ""}.
          </p>
          <Link
            href="/rides"
            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl font-medium hover:brightness-110 transition-all"
          >
            <IconSearch size={20} />
            Tìm chuyến
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRides.map((ride, idx) => {
            let badgeText = "";
            let badgeColor = "";

            if (ride.myRequestStatus === "PENDING") {
              badgeText = "Đang chờ tài xế duyệt";
              badgeColor = "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800";
            } else if (ride.myRequestStatus === "ACCEPTED") {
              badgeText = "Đã được chấp nhận";
              badgeColor = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800";
            } else if (ride.myRequestStatus === "REJECTED") {
              badgeText = "Bị từ chối";
              badgeColor = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800";
            }

            return (
              <div key={ride.id} className="relative group bg-white dark:bg-surface-50 rounded-3xl border border-border overflow-hidden">
                <div className={`px-4 py-2 text-xs font-semibold flex items-center justify-center ${badgeColor}`}>
                  {badgeText}
                </div>
                
                <div className="p-1">
                  <RideCard 
                    ride={ride} 
                    index={idx} 
                    showAction={false}
                    isMyRequest={true}
                  />
                </div>

                <div className="px-4 pb-4 bg-white dark:bg-surface-50">
                  <div className="bg-surface-50 dark:bg-surface-100 rounded-2xl p-2 border border-border flex gap-2">
                    {ride.myRequestStatus === "ACCEPTED" && (
                      <button 
                        onClick={() => router.push(`/messages`)}
                        className="flex-1 flex justify-center items-center py-2 bg-[var(--color-primary)] text-white rounded-xl text-sm font-medium hover:brightness-110 transition-all"
                      >
                        Nhắn tin với tài xế
                      </button>
                    )}
                    
                    {ride.myRequestStatus === "PENDING" && (
                      <button 
                        onClick={() => handleCancelRequest(ride.id)}
                        className="flex-1 flex justify-center items-center py-2 bg-surface-200 dark:bg-surface-300 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-surface-300 transition-all"
                      >
                        Huỷ yêu cầu
                      </button>
                    )}

                    {ride.myRequestStatus === "REJECTED" && (
                      <button 
                        onClick={() => router.push(`/rides`)}
                        className="flex-1 flex justify-center items-center py-2 bg-surface-200 dark:bg-surface-300 text-[var(--text-heading)] rounded-xl text-sm font-medium hover:bg-surface-300 transition-all"
                      >
                        Tìm chuyến khác
                      </button>
                    )}

                    {ride.status === "COMPLETED" && ride.myRequestStatus === "ACCEPTED" && (
                      <div className="flex-1">
                        {ride.reviews?.some((r: any) => r.revieweeId === ride.driverId) ? (
                          <div className="w-full flex justify-center items-center py-2 bg-surface-100 text-[var(--text-muted)] rounded-xl text-sm font-medium">
                            Đã đánh giá ✓
                          </div>
                        ) : (
                          <button 
                            onClick={() => setReviewData({ rideId: ride.id, revieweeId: ride.driverId, revieweeName: ride.driver?.name, revieweeAvatar: ride.driver?.avatarUrl })}
                            className="w-full flex justify-center items-center py-2 bg-[var(--color-gold-500)] text-white rounded-xl text-sm font-medium hover:brightness-110 transition-all"
                          >
                            Đánh giá tài xế
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
};
