"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout, AppHeader } from "@/components/layout";
import { Card, Input, Button, LocationPicker, LocationData } from "@/components/ui";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const DAY_MAP: Record<string, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};

export default function BulkCreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedSchedules, setSelectedSchedules] = useState<Set<string>>(new Set());
  
  const [formData, setFormData] = useState({
    pickupLocation: null as LocationData | null,
    destinationLocation: null as LocationData | null,
    vehicleId: "",
    seats: 4,
    price: 0,
    mode: "COMMUNITY" as "COMMUNITY" | "GAS_TIP",
  });

  const [previewDates, setPreviewDates] = useState<{ id: string; date: Date; scheduleId: string; checked: boolean }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiClient.get("/schedules/me").then(res => setSchedules(res.data)).catch(console.error);
  }, []);

  const toggleSchedule = (id: string) => {
    const next = new Set(selectedSchedules);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedSchedules(next);
  };

  const generatePreviewDates = () => {
    const dates: any[] = [];
    const now = new Date();
    
    Array.from(selectedSchedules).forEach(schedId => {
      const sched = schedules.find(s => s.id === schedId);
      if (!sched) return;
      
      const targetDay = DAY_MAP[sched.dayOfWeek];
      const [h, m] = sched.startTime.split(':').map(Number);
      
      for (let i = 0; i < 4; i++) {
        const d = new Date(now);
        // Find next occurrence of targetDay
        let daysUntil = (targetDay - d.getDay() + 7) % 7;
        
        // If it's today but time has passed, jump to next week
        if (daysUntil === 0 && (d.getHours() * 60 + d.getMinutes() > h * 60 + m)) {
          daysUntil = 7;
        }
        
        d.setDate(d.getDate() + daysUntil + i * 7);
        d.setHours(h, m, 0, 0);
        
        dates.push({
          id: `${schedId}-${i}`,
          date: d,
          scheduleId: schedId,
          checked: true
        });
      }
    });
    
    setPreviewDates(dates.sort((a, b) => a.date.getTime() - b.date.getTime()));
  };

  const handleNext = () => {
    if (step === 1) {
      if (selectedSchedules.size === 0) return toast.error("Vui lòng chọn ít nhất 1 TKB");
      setStep(2);
    } else if (step === 2) {
      if (!formData.pickupLocation || !formData.destinationLocation) return toast.error("Vui lòng nhập điểm đi và điểm đến");
      if (!formData.vehicleId) return toast.error("Vui lòng chọn phương tiện");
      generatePreviewDates();
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    const finalDates = previewDates.filter(d => d.checked).map(d => d.date.toISOString());
    if (finalDates.length === 0) return toast.error("Bạn chưa chọn ngày nào");
    
    setIsSubmitting(true);
    try {
      await apiClient.post("/rides/bulk-from-schedules", {
        dates: finalDates,
        pickupLocation: formData.pickupLocation,
        destinationLocation: formData.destinationLocation,
        vehicleId: formData.vehicleId,
        seats: formData.seats,
        price: formData.price,
        mode: formData.mode,
      });
      toast.success("Tạo chuyến hàng loạt thành công!");
      router.push("/rides/my");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Lỗi tạo chuyến");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <AppHeader title="Tạo từ TKB" showBack onBack={() => step > 1 ? setStep(step - 1) : router.back()} />
      <div className="p-4 pb-32">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Chọn Thời khóa biểu</h3>
            {schedules.map(sched => (
              <Card key={sched.id} className="p-4 flex items-center justify-between" onClick={() => toggleSchedule(sched.id)}>
                <div>
                  <div className="font-medium">{sched.subjectName}</div>
                  <div className="text-sm text-surface-500">{sched.dayOfWeek} • {sched.startTime}</div>
                </div>
                <input type="checkbox" checked={selectedSchedules.has(sched.id)} onChange={() => toggleSchedule(sched.id)} className="w-5 h-5 rounded border-surface-300 text-primary-500" />
              </Card>
            ))}
            {schedules.length === 0 && <div className="text-center p-8 text-surface-500">Không có thời khóa biểu</div>}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Chi tiết chuyến đi</h3>
            <Card className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Điểm đón</label>
                <LocationPicker
                  value={formData.pickupLocation || undefined}
                  onChange={(v) => setFormData(p => ({ ...p, pickupLocation: v }))}
                  placeholder="Nhập điểm đón"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Điểm đến</label>
                <LocationPicker
                  value={formData.destinationLocation || undefined}
                  onChange={(v) => setFormData(p => ({ ...p, destinationLocation: v }))}
                  placeholder="Nhập điểm đến"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Biển số xe</label>
                <Input value={formData.vehicleId} onChange={e => setFormData(p => ({ ...p, vehicleId: e.target.value }))} placeholder="Ví dụ: 30A-12345" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">Số chỗ</label>
                  <Input type="number" min="1" max="4" value={formData.seats.toString()} onChange={e => setFormData(p => ({ ...p, seats: parseInt(e.target.value) || 1 }))} />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">Giá (VNĐ)</label>
                  <Input type="number" min="0" step="1000" value={formData.price.toString()} onChange={e => setFormData(p => ({ ...p, price: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Xem trước các chuyến sẽ tạo</h3>
            <p className="text-sm text-surface-500">Bỏ chọn các ngày bạn không muốn tạo chuyến.</p>
            {previewDates.map(item => (
              <Card key={item.id} className="p-4 flex items-center justify-between" onClick={() => {
                setPreviewDates(dates => dates.map(d => d.id === item.id ? { ...d, checked: !d.checked } : d));
              }}>
                <div>
                  <div className="font-medium">{item.date.toLocaleDateString('vi-VN')}</div>
                  <div className="text-sm text-surface-500">{item.date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <input type="checkbox" checked={item.checked} onChange={() => {
                  setPreviewDates(dates => dates.map(d => d.id === item.id ? { ...d, checked: !d.checked } : d));
                }} className="w-5 h-5 rounded border-surface-300 text-primary-500" />
              </Card>
            ))}
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface-0 border-t border-[var(--border-default)] z-40 pb-safe">
          <div className="max-w-2xl mx-auto flex gap-3">
            <Button variant="primary" onClick={step === 3 ? handleSubmit : handleNext} loading={isSubmitting} className="w-full">
              {step === 3 ? "Xác nhận tạo" : "Tiếp tục"}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
