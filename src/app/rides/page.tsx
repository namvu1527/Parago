"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppLayout, AppHeader } from "@/components/layout";
import { Card, Avatar, Badge, Input, StarRating, Skeleton, Button } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import { mockRides, type Ride } from "@/lib/mock-data";
import {
  IconSearch,
  IconFilter,
  IconCalendar,
  IconClock,
  IconUsers,
  IconMapPin,
  IconArrowRight,
  IconCar,
  IconMotorbike,
  IconLeaf,
  IconGasStation,
  IconStar,
  IconChevronRight,
  IconAdjustments,
} from "@tabler/icons-react";

const filters = [
  { id: "all", label: "Tất cả" },
  { id: "university", label: "Cùng trường" },
  { id: "car", label: "Ô tô" },
  { id: "motorcycle", label: "Xe máy" },
  { id: "community", label: "Miễn phí" },
  { id: "gas-tip", label: "Gas & Tip" },
  { id: "recurring", label: "Lịch trình" },
];

const statusColors = {
  published: { bg: "bg-green-50 dark:bg-green-500/10", text: "text-green-600 dark:text-green-400", label: "Đang mở" },
  matched: { bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", label: "Đã ghép" },
  confirmed: { bg: "bg-primary-50 dark:bg-primary-500/10", text: "text-primary-600 dark:text-primary-400", label: "Đã xác nhận" },
  "in-progress": { bg: "bg-orange-50 dark:bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", label: "Đang đi" },
  completed: { bg: "bg-surface-100 dark:bg-surface-200", text: "text-text-secondary", label: "Hoàn thành" },
  cancelled: { bg: "bg-red-50 dark:bg-red-500/10", text: "text-red-600 dark:text-red-400", label: "Đã hủy" },
};

function RideCard({ ride, index }: { ride: Ride; index: number }) {
  const status = statusColors[ride.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/rides/${ride.id}`}>
        <Card variant="elevated" hover className="overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <Avatar name={ride.driver.name} size="md" verified={ride.driver.verified} premium={ride.driver.isPremium} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-[var(--text-heading)]">{ride.driver.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarRating rating={ride.driver.rating} size="sm" />
                  <span className="text-xs text-[var(--text-muted)]">{ride.driver.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {ride.matchScore && (
                <Badge variant="primary" size="sm">
                  {ride.matchScore}% phù hợp
                </Badge>
              )}
            </div>
          </div>

          {/* Route */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
              <div className="w-0.5 h-8 bg-surface-200 dark:bg-surface-300 my-0.5" />
              <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-heading)] truncate">{ride.pickupShort}</p>
              <p className="text-[11px] text-[var(--text-muted)] truncate mb-2">{ride.pickup}</p>
              <p className="text-sm font-medium text-[var(--text-heading)] truncate">{ride.destinationShort}</p>
              <p className="text-[11px] text-[var(--text-muted)] truncate">{ride.destination}</p>
            </div>
          </div>

          {/* Info row */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <IconClock size={14} />
              {ride.departureTime}
            </div>
            <span className="text-surface-300">•</span>
            <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <IconCalendar size={14} />
              {ride.date}
            </div>
            <span className="text-surface-300">•</span>
            <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <IconUsers size={14} />
              {ride.seatsAvailable}/{ride.seats} chỗ
            </div>
            <span className="text-surface-300">•</span>
            <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              {ride.vehicleType === "car" ? <IconCar size={14} /> : <IconMotorbike size={14} />}
              {ride.distance}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
            <div className="flex items-center gap-2">
              {ride.mode === "community" ? (
                <Badge variant="success" size="sm">
                  <IconLeaf size={12} /> Miễn phí
                </Badge>
              ) : (
                <Badge variant="gold" size="sm">
                  <IconGasStation size={12} /> {formatCurrency(ride.price)}
                </Badge>
              )}
              {ride.recurring && (
                <Badge variant="outline" size="sm">
                  {ride.recurring === "daily" ? "Hàng ngày" : "Hàng tuần"}
                </Badge>
              )}
              <span className={cn("text-xs px-2 py-0.5 rounded-full", status.bg, status.text)}>
                {status.label}
              </span>
            </div>
            <Button size="sm" variant="primary">
              Ghép xe <IconChevronRight size={14} />
            </Button>
          </div>

          {/* Notes */}
          {ride.notes && (
            <p className="text-xs text-[var(--text-muted)] mt-2 italic">"{ride.notes}"</p>
          )}
        </Card>
      </Link>
    </motion.div>
  );
}

function RideCardSkeleton() {
  return (
    <Card variant="elevated" className="space-y-3">
      <div className="flex items-center gap-2.5">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="space-y-1.5">
          <Skeleton className="w-28 h-3.5" />
          <Skeleton className="w-16 h-3" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <Skeleton variant="circular" className="w-2.5 h-2.5" />
          <Skeleton className="w-0.5 h-8" />
          <Skeleton variant="circular" className="w-2.5 h-2.5" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className="w-3/4 h-3.5" />
          <Skeleton className="w-1/2 h-3" />
          <Skeleton className="w-2/3 h-3.5" />
          <Skeleton className="w-1/3 h-3" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-16 h-5 rounded-full" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>
    </Card>
  );
}

export default function RidesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredRides = mockRides.filter((ride) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "car") return ride.vehicleType === "car";
    if (activeFilter === "motorcycle") return ride.vehicleType === "motorcycle";
    if (activeFilter === "community") return ride.mode === "community";
    if (activeFilter === "gas-tip") return ride.mode === "gas-tip";
    if (activeFilter === "recurring") return !!ride.recurring;
    return true;
  });

  return (
    <AppLayout>
      <AppHeader title="Chuyến đi" showSearch showNotification />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Tìm điểm đón, điểm đến..."
            icon={<IconSearch size={18} />}
            rightIcon={
              <button className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                <IconAdjustments size={16} />
              </button>
            }
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200",
                activeFilter === filter.id
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                  : "bg-surface-100 text-text-secondary hover:bg-surface-200 dark:bg-surface-200 dark:hover:bg-surface-300"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--text-muted)]">
            {filteredRides.length} chuyến đi có sẵn
          </p>
          <button className="text-xs text-primary-500 font-medium flex items-center gap-1">
            <IconFilter size={14} /> Bộ lọc
          </button>
        </div>

        {/* Rides list */}
        <div className="space-y-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <RideCardSkeleton key={i} />)
            : filteredRides.map((ride, i) => (
                <RideCard key={ride.id} ride={ride} index={i} />
              ))}
        </div>
      </div>
    </AppLayout>
  );
}
