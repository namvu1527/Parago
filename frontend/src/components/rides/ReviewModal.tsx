"use client";

import React, { useState } from 'react';
import { BottomSheet } from '@/components/ui';
import { Button } from '@/components/ui';
import { StarRating } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { reviewService } from '@/services/review.service';
import { toast } from 'sonner';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  rideId: string;
  revieweeId: string;
  revieweeName: string;
  revieweeAvatar?: string;
  onSuccess?: () => void;
}

export function ReviewModal({ isOpen, onClose, rideId, revieweeId, revieweeName, revieweeAvatar, onSuccess }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await reviewService.createReview({
        rideId,
        revieweeId,
        rating,
        comment: comment.trim() || undefined
      });
      toast.success('Đã gửi đánh giá thành công!');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheet open={isOpen} onClose={onClose} title="Đánh giá chuyến đi">
      <div className="flex flex-col items-center p-4">
        <Avatar src={revieweeAvatar} name={revieweeName} size="xl" className="mb-4" />
        <h3 className="text-lg font-medium mb-1">{revieweeName}</h3>
        <p className="text-sm text-zinc-500 mb-6">Bạn cảm thấy chuyến đi thế nào?</p>
        
        <div className="mb-8">
          <StarRating rating={rating} size="lg" onChange={setRating} interactive />
        </div>

        <div className="w-full mb-6">
          <label className="block text-sm font-medium mb-2">Nhận xét (không bắt buộc)</label>
          <textarea 
            className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
            placeholder="Chia sẻ trải nghiệm của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button 
          variant="primary" 
          fullWidth 
          size="lg" 
          onClick={handleSubmit}
          loading={loading}
          disabled={loading || rating === 0}
        >
          Gửi đánh giá
        </Button>
      </div>
    </BottomSheet>
  );
}
