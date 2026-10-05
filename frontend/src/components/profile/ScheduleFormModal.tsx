'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconClock, IconMapPin, IconBuilding, IconBook } from '@tabler/icons-react';
import { Button } from '@/components/ui';
import { Schedule, CreateScheduleInput } from '@/services/schedule.service';
import { toast } from 'sonner';

interface ScheduleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateScheduleInput, id?: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  initialData?: Schedule | null;
}

const DAYS_OF_WEEK = [
  { value: 'MON', label: 'Thứ 2' },
  { value: 'TUE', label: 'Thứ 3' },
  { value: 'WED', label: 'Thứ 4' },
  { value: 'THU', label: 'Thứ 5' },
  { value: 'FRI', label: 'Thứ 6' },
  { value: 'SAT', label: 'Thứ 7' },
  { value: 'SUN', label: 'Chủ nhật' },
];

export function ScheduleFormModal({ isOpen, onClose, onSave, onDelete, initialData }: ScheduleFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState<CreateScheduleInput>({
    dayOfWeek: 'MON',
    startTime: '07:30',
    endTime: '09:30',
    subjectName: '',
    room: '',
    building: ''
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        dayOfWeek: initialData.dayOfWeek,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        subjectName: initialData.subjectName || '',
        room: initialData.room || '',
        building: initialData.building || '',
      });
    } else if (isOpen && !initialData) {
      setFormData({
        dayOfWeek: 'MON',
        startTime: '07:30',
        endTime: '09:30',
        subjectName: '',
        room: '',
        building: ''
      });
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate time
    const startMins = parseInt(formData.startTime.split(':')[0]) * 60 + parseInt(formData.startTime.split(':')[1]);
    const endMins = parseInt(formData.endTime.split(':')[0]) * 60 + parseInt(formData.endTime.split(':')[1]);
    
    if (endMins <= startMins) {
      toast.error('Giờ kết thúc phải sau giờ bắt đầu');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSave(formData, initialData?.id);
      toast.success(initialData ? 'Đã lưu thay đổi' : 'Đã thêm buổi học');
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Không thể lưu thời khoá biểu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !onDelete) return;
    
    if (window.confirm('Bạn có chắc chắn muốn xoá buổi học này?')) {
      try {
        setIsDeleting(true);
        await onDelete(initialData.id);
        toast.success('Đã xoá buổi học');
        onClose();
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Không thể xoá thời khoá biểu');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-24 bottom-auto max-h-[80vh] md:w-full md:max-w-md md:mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="font-semibold text-lg">
                {initialData ? 'Sửa buổi học' : 'Thêm buổi học mới'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <IconX size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <form id="schedule-form" onSubmit={handleSubmit} className="space-y-4">
                {/* Ngày trong tuần */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Ngày trong tuần <span className="text-red-500">*</span></label>
                  <select 
                    className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    value={formData.dayOfWeek}
                    onChange={(e) => setFormData({...formData, dayOfWeek: e.target.value as any})}
                    required
                  >
                    {DAYS_OF_WEEK.map(day => (
                      <option key={day.value} value={day.value}>{day.label}</option>
                    ))}
                  </select>
                </div>

                {/* Giờ học */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Từ giờ <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <IconClock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input 
                        type="time" 
                        required
                        value={formData.startTime}
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Đến giờ <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <IconClock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input 
                        type="time" 
                        required
                        value={formData.endTime}
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 my-4" />

                {/* Môn học */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Tên môn học <span className="text-zinc-400 font-normal">(Không bắt buộc)</span></label>
                  <div className="relative">
                    <IconBook className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="VD: Toán rời rạc"
                      value={formData.subjectName}
                      onChange={(e) => setFormData({...formData, subjectName: e.target.value})}
                      className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Phòng & Toà nhà */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phòng học <span className="text-zinc-400 font-normal">(Tuỳ chọn)</span></label>
                    <div className="relative">
                      <IconMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="VD: 301"
                        value={formData.room}
                        onChange={(e) => setFormData({...formData, room: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Toà nhà <span className="text-zinc-400 font-normal">(Tuỳ chọn)</span></label>
                    <div className="relative">
                      <IconBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="VD: D9"
                        value={formData.building}
                        onChange={(e) => setFormData({...formData, building: e.target.value})}
                        className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-900/50">
              <Button 
                type="submit" 
                form="schedule-form" 
                className="w-full h-12 rounded-xl text-base"
                loading={isSubmitting}
              >
                {initialData ? 'Lưu thay đổi' : 'Thêm buổi học'}
              </Button>
              
              {initialData && onDelete && (
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleDelete}
                  className="w-full h-12 rounded-xl text-base text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                  loading={isDeleting}
                  disabled={isSubmitting}
                >
                  Xoá buổi học
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
