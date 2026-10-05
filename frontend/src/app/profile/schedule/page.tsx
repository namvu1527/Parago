'use client';

import { AppLayout, AppHeader } from "@/components/layout";
import { ScheduleManager } from "@/components/profile/ScheduleManager";

export default function SchedulePage() {
  return (
    <AppLayout>
      <AppHeader title="Thời khoá biểu" showBack />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <ScheduleManager />
      </div>
    </AppLayout>
  );
}
