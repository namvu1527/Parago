import { apiClient } from '@/lib/api-client';

export interface Review {
  id: string;
  rideId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  ride?: {
    pickupLocation: string;
    destinationLocation: string;
  };
}

export interface CreateReviewData {
  rideId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
}

export const reviewService = {
  createReview: async (data: CreateReviewData): Promise<Review> => {
    const response = await apiClient.post('/reviews', data);
    return response.data;
  },

  getUserReviews: async (userId: string): Promise<Review[]> => {
    const response = await apiClient.get(`/reviews/user/${userId}`);
    return response.data;
  },
};
