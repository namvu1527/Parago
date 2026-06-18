"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { AppLayout, AppHeader } from "@/components/layout";
import { Card, Avatar, StarRating, Badge, Button, Skeleton } from "@/components/ui";
import { mockRides, mockUsers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  IconMessage,
  IconClock,
  IconMapPin,
  IconCheck,
  IconSchool,
  IconBook,
  IconCircleCheckFilled,
  IconChevronRight,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function RideDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const ride = mockRides.find((r) => r.id === id) || mockRides[0];
  const [score, setScore] = useState(0);
  const targetScore = ride.matchScore || 95;

  useEffect(() => {
    // Animate circular progress
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setScore(current);
        if (current >= targetScore) clearInterval(interval);
      }, 15);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, [targetScore]);

  return (
    <AppLayout>
      <AppHeader title={ride.destinationShort} showBack />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* TOP ROUTE CARD */}
        <Card variant="elevated" className="overflow-hidden">
          <div className="bg-primary-500 p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full uppercase tracking-wider">
                {ride.date} • {ride.departureTime}
              </span>
              <span className="text-sm font-bold">
                {ride.mode === "community" ? "Miễn phí" : formatCurrency(ride.price)}
              </span>
            </div>
            
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-white border-2 border-primary-500 shadow-sm" />
                <div className="w-0.5 h-10 bg-white/40 my-1" />
                <div className="w-3 h-3 rounded-full bg-gold-400 border-2 border-white shadow-sm" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="font-bold text-lg leading-tight">{ride.pickupShort}</p>
                  <p className="text-sm text-white/80 line-clamp-1">{ride.pickup}</p>
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight">{ride.destinationShort}</p>
                  <p className="text-sm text-white/80 line-clamp-1">{ride.destination}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar name={ride.driver.name} size="lg" verified={ride.driver.verified} premium={ride.driver.isPremium} />
              <div>
                <p className="font-bold text-[var(--text-heading)]">{ride.driver.name}</p>
                <div className="flex items-center gap-1">
                  <StarRating rating={ride.driver.rating} size="sm" />
                  <span className="text-xs text-[var(--text-muted)]">({ride.driver.totalRides} chuyến)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-1">{ride.vehicleName}</Badge>
              <p className="text-xs text-[var(--text-muted)]">{ride.seatsAvailable} chỗ trống</p>
            </div>
          </div>
        </Card>

        {/* MATCH SCORE SECTION */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-[var(--text-heading)] mb-6">Mức độ phù hợp</h3>
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-surface-200)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none"
                stroke={score >= 80 ? "#4CAF50" : score >= 60 ? "#FFC107" : "#F44336"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 283} 283`}
                initial={{ strokeDasharray: "0 283" }}
                animate={{ strokeDasharray: `${(score / 100) * 283} 283` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-[var(--text-heading)]">{score}%</span>
              <span className="text-xs text-green-500 font-semibold uppercase mt-1 tracking-wider">Tuyệt vời</span>
            </div>
          </div>

          <div className="bg-surface-50 rounded-2xl p-4 space-y-3 text-left border border-surface-200">
            <div className="flex items-center gap-3">
              <IconCircleCheckFilled className="text-green-500" size={20} />
              <span className="text-sm flex-1">Cùng trường đại học</span>
              <Badge variant="success" size="sm">+20%</Badge>
            </div>
            <div className="flex items-center gap-3">
              <IconCircleCheckFilled className="text-green-500" size={20} />
              <span className="text-sm flex-1">Cùng khoa viện</span>
              <Badge variant="success" size="sm">+15%</Badge>
            </div>
            <div className="flex items-center gap-3">
              <IconCircleCheckFilled className="text-green-500" size={20} />
              <span className="text-sm flex-1">Gần điểm xuất phát (1.2km)</span>
              <Badge variant="success" size="sm">+25%</Badge>
            </div>
            <div className="flex items-center gap-3">
              <IconCircleCheckFilled className="text-green-500" size={20} />
              <span className="text-sm flex-1">Tài xế đánh giá cao</span>
              <Badge variant="success" size="sm">+15%</Badge>
            </div>
          </div>
        </div>

        {/* TRUST & SAFETY */}
        <Card className="bg-primary-50 dark:bg-primary-900 border-primary-100 dark:border-primary-800 p-4 flex gap-3">
          <IconShieldCheck className="text-primary-500 shrink-0 mt-0.5" size={24} />
          <div>
            <h4 className="font-semibold text-primary-700 dark:text-primary-300 text-sm mb-1">Chuyến đi an toàn</h4>
            <p className="text-xs text-primary-600 dark:text-primary-400">Tài xế đã được xác thực sinh viên và có hồ sơ lái xe uy tín trên Parago.</p>
          </div>
        </Card>

        {/* BOTTOM ACTION BAR */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface-0 border-t border-[var(--border-default)] z-40 pb-safe">
          <div className="max-w-2xl mx-auto flex gap-3">
            <Button variant="secondary" className="flex-1" icon={<IconMessage size={18} />}>
              Nhắn tin
            </Button>
            <Button variant="primary" className="flex-[2]">
              Ghép xe ngay
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
