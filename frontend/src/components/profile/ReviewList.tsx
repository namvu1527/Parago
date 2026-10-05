"use client";

import React, { useEffect, useState } from "react";
import { Avatar, StarRating } from "@/components/ui";
import { Review, reviewService } from "@/services/review.service";
import { formatRelativeTime } from "@/lib/utils";
import { IconMessageCircle } from "@tabler/icons-react";

export function ReviewList({ userId }: { userId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    reviewService.getUserReviews(userId)
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4 text-zinc-500">Đang tải đánh giá...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-6 flex flex-col items-center">
        <IconMessageCircle className="text-zinc-300 mb-2" size={32} />
        <p className="text-zinc-500 text-sm">Chưa có đánh giá nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-surface-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-surface-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <Avatar 
                src={review.reviewer?.avatarUrl} 
                name={review.reviewer?.name || '?'} 
                size="sm" 
              />
              <div>
                <h4 className="font-medium text-sm">{review.reviewer?.name || 'Người dùng ẩn danh'}</h4>
                <div className="flex items-center gap-1">
                  <StarRating rating={review.rating} size="sm" />
                </div>
              </div>
            </div>
            <span className="text-xs text-zinc-500">
              {formatRelativeTime(new Date(review.createdAt))}
            </span>
          </div>
          
          {review.comment && (
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 italic">
              "{review.comment}"
            </p>
          )}
          
          {review.ride && (
            <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
              Chuyến: {review.ride.pickupLocation} → {review.ride.destinationLocation}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
