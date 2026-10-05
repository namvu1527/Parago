import { apiClient } from '../lib/api-client';

export interface Schedule {
  id: string;
  subjectName?: string;
  room?: string;
  building?: string;
  dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export type CreateScheduleInput = Omit<Schedule, 'id' | 'isActive'> & { isActive?: boolean };
export type UpdateScheduleInput = Partial<CreateScheduleInput>;

export const scheduleService = {
  getMySchedules: async (): Promise<Schedule[]> => {
    const res = await apiClient.get('/schedules/me');
    return res.data;
  },

  createSchedule: async (data: CreateScheduleInput): Promise<Schedule> => {
    const res = await apiClient.post('/schedules', data);
    return res.data;
  },

  updateSchedule: async (id: string, data: UpdateScheduleInput): Promise<Schedule> => {
    const res = await apiClient.patch(`/schedules/${id}`, data);
    return res.data;
  },

  deleteSchedule: async (id: string): Promise<void> => {
    await apiClient.delete(`/schedules/${id}`);
  }
};
