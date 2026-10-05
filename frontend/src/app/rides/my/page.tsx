"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppLayout, AppHeader } from "@/components/layout";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/auth-store";
import { IconCar, IconUser } from "@tabler/icons-react";
import { DriverRidesTab } from "@/components/features/rides/DriverRidesTab";
import { PassengerRidesTab } from "@/components/features/rides/PassengerRidesTab";

export default function MyRidesPage() {
  const [activeTab, setActiveTab] = useState<"driver" | "passenger">("driver");
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  const fetchMyRides = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await apiClient.get(`/rides/my?role=${activeTab}`);
      const data = res.data.map((r: any) => ({
        ...r,
        pickupShort: r.pickupLocation?.split(",")[0],
        destinationShort: r.destinationLocation?.split(",")[0],
        date: r.departureAt ? new Date(r.departureAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : '',
        departureTime: r.departureAt ? new Date(r.departureAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '',
      }));
      setRides(data);
    } catch (err) {
      console.error("Lỗi khi tải chuyến đi", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, user]);

  useEffect(() => {
    fetchMyRides();
  }, [fetchMyRides]);

  return (
    <AppLayout>
      <AppHeader title="Chuyến đi của tôi" showBack={false} />

      <div className="max-w-2xl mx-auto px-4 py-4 pb-24 h-full">
        {/* TABS */}
        <div className="flex bg-surface-100 dark:bg-surface-200 p-1 rounded-2xl mb-6">
          <button
            className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "driver" 
                ? "bg-white dark:bg-surface-0 shadow-sm text-[var(--text-heading)]" 
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
            onClick={() => setActiveTab("driver")}
          >
            <IconCar size={18} />
            Tôi đăng
          </button>
          <button
            className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "passenger" 
                ? "bg-white dark:bg-surface-0 shadow-sm text-[var(--text-heading)]" 
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
            onClick={() => setActiveTab("passenger")}
          >
            <IconUser size={18} />
            Tôi ghép
          </button>
        </div>

        {/* TABS CONTENT */}
        {activeTab === "driver" ? (
          <DriverRidesTab 
            rides={rides} 
            loading={loading} 
            onRefresh={fetchMyRides} 
          />
        ) : (
          <PassengerRidesTab 
            rides={rides} 
            loading={loading} 
            onRefresh={fetchMyRides} 
          />
        )}
      </div>
    </AppLayout>
  );
}
