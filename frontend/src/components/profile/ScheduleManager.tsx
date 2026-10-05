'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { IconCalendarPlus, IconClock, IconMapPin, IconPlus } from '@tabler/icons-react';
import { Button, EmptyState, Skeleton } from '@/components/ui';
import { Schedule, CreateScheduleInput, scheduleService } from '@/services/schedule.service';
import { ScheduleFormModal } from './ScheduleFormModal';

const DAY_ORDER = {
  MON: { label: 'Thứ 2', order: 1 },
  TUE: { label: 'Thứ 3', order: 2 },
  WED: { label: 'Thứ 4', order: 3 },
  THU: { label: 'Thứ 5', order: 4 },
  FRI: { label: 'Thứ 6', order: 5 },
  SAT: { label: 'Thứ 7', order: 6 },
  SUN: { label: 'Chủ nhật', order: 7 },
};

export function ScheduleManager() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  const fetchSchedules = async () => {
    try {
      setIsLoading(true);
      const data = await scheduleService.getMySchedules();
      setSchedules(data);
    } catch (err) {
      console.error('Failed to fetch schedules', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSave = async (data: CreateScheduleInput, id?: string) => {
    if (id) {
      await scheduleService.updateSchedule(id, data);
    } else {
      await scheduleService.createSchedule(data);
    }
    await fetchSchedules(); // Refetch after saving
  };

  const handleDelete = async (id: string) => {
    await scheduleService.deleteSchedule(id);
    await fetchSchedules(); // Refetch after deleting
  };

  const openAddModal = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const openEditModal = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  // Group and sort schedules
  const groupedSchedules = useMemo(() => {
    const groups: Record<string, Schedule[]> = {};
    
    // Group
    schedules.forEach(schedule => {
      if (!groups[schedule.dayOfWeek]) {
        groups[schedule.dayOfWeek] = [];
      }
      groups[schedule.dayOfWeek].push(schedule);
    });

    // Sort days
    const sortedDays = Object.keys(groups).sort((a, b) => 
      DAY_ORDER[a as keyof typeof DAY_ORDER].order - DAY_ORDER[b as keyof typeof DAY_ORDER].order
    );

    // Sort items within days by startTime
    sortedDays.forEach(day => {
      groups[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return { groups, sortedDays };
  }, [schedules]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2].map(i => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <>
        <EmptyState
          icon={<IconCalendarPlus size={48} className="text-zinc-400 dark:text-zinc-500 mx-auto mb-4" />}
          title="Bạn chưa có thời khoá biểu"
          description="Thêm lịch học để Parago gợi ý các chuyến đi chung phù hợp nhất nhé."
          action={
            <Button onClick={openAddModal}>Thêm buổi học đầu tiên</Button>
          }
        />
        <ScheduleFormModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </>
    );
  }

  return (
    <div className="pb-24 space-y-6 relative">
      <div className="flex items-center justify-between mb-2">
        <p className="text-zinc-500 text-sm">
          {schedules.length} buổi học mỗi tuần
        </p>
        <Button size="sm" variant="outline" onClick={openAddModal} className="h-9 rounded-full px-4 gap-1.5">
          <IconPlus size={16} />
          <span>Thêm</span>
        </Button>
      </div>

      {groupedSchedules.sortedDays.map((day) => (
        <div key={day} className="space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-500"></span>
            {DAY_ORDER[day as keyof typeof DAY_ORDER].label}
          </h3>
          
          <div className="space-y-3">
            {groupedSchedules.groups[day].map((schedule, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={schedule.id}
                onClick={() => openEditModal(schedule)}
                className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-base text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {schedule.subjectName || 'Buổi học'}
                  </h4>
                  <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2.5 py-1 rounded-lg text-sm font-medium">
                    <IconClock size={16} />
                    <span>{schedule.startTime} - {schedule.endTime}</span>
                  </div>
                </div>
                
                {(schedule.room || schedule.building) && (
                  <div className="flex items-center gap-3 text-sm text-zinc-500 mt-3">
                    <div className="flex items-center gap-1.5">
                      <IconMapPin size={16} className="text-zinc-400" />
                      <span>{schedule.room ? `Phòng ${schedule.room}` : ''} {schedule.building ? `- Tòa ${schedule.building}` : ''}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <ScheduleFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        initialData={editingSchedule}
      />
    </div>
  );
}
