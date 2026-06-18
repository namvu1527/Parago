"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Avatar, StarRating, FAB, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  IconChevronLeft,
  IconPhone,
  IconMessage,
  IconShieldCheck,
  IconShare,
  IconCurrentLocation,
} from "@tabler/icons-react";
import Link from "next/link";

export default function LiveTrackingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(30); // 30% complete
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full bg-[#E5E3DF] overflow-hidden">
      {/* MAP BACKGROUND SIMULATION */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gridme.png')] opacity-20 mix-blend-multiply" />
        
        {/* Animated route path */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}>
          <path
            d="M 50,800 Q 150,500 300,400 T 500,200"
            fill="none"
            stroke="#D32F2F"
            strokeWidth="6"
            strokeLinecap="round"
            className="opacity-20"
          />
          <path
            d="M 50,800 Q 150,500 300,400 T 500,200"
            fill="none"
            stroke="#D32F2F"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="10 15"
            className="animate-[dash_20s_linear_infinite]"
          />
        </svg>

        {/* Location Markers */}
        <div className="absolute left-[50px] bottom-[20%] w-6 h-6 rounded-full bg-white border-4 border-primary-500 shadow-lg -translate-x-1/2 translate-y-1/2" />
        <div className="absolute right-[20%] top-[20%] w-6 h-6 rounded-full bg-white border-4 border-gold-500 shadow-lg translate-x-1/2 -translate-y-1/2" />

        {/* Moving Car Indicator */}
        <motion.div
          className="absolute w-12 h-12 -ml-6 -mt-6 bg-white rounded-full shadow-xl flex items-center justify-center z-10"
          animate={{
            x: `${progress}%`, // Simplified movement for visual effect
            y: `${progress}%`,
          }}
          transition={{ type: "tween", ease: "linear" }}
          style={{ left: "30%", top: "40%" }}
        >
          <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
             <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* TOP HEADER & ROUTE INFO */}
      <div className="absolute top-0 left-0 right-0 z-20 safe-top p-4 space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-surface-50 transition-colors"
          >
            <IconChevronLeft size={24} />
          </button>
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-4 border border-white/50"
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-2xl font-bold text-primary-500">12 phút</h2>
              <p className="text-sm text-[var(--text-muted)]">3.2 km • 14:45 đến nơi</p>
            </div>
            <div className="text-right">
              <Badge variant="success" className="animate-pulse">Đang di chuyển</Badge>
            </div>
          </div>
          
          <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* FLOATING ACTION BUTTONS */}
      <div className="absolute right-4 bottom-48 z-20 flex flex-col gap-3">
        <button className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[var(--text-heading)] hover:bg-surface-50 transition-colors">
          <IconCurrentLocation size={24} />
        </button>
        <button className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors">
          <IconShare size={24} />
        </button>
        <Link href="/sos">
          <button className="w-12 h-12 bg-red-600 shadow-lg shadow-red-600/30 rounded-full flex items-center justify-center text-white relative">
            <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-50" />
            <IconShieldCheck size={24} />
          </button>
        </Link>
      </div>

      {/* DRIVER INFO BOTTOM SHEET */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-surface-200 pb-safe"
      >
        <div className="w-12 h-1.5 bg-surface-300 rounded-full mx-auto my-3" />
        <div className="p-5 pt-2 space-y-5">
          {/* Driver & Vehicle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar name="Trần Văn Minh" size="lg" verified premium />
              <div>
                <h3 className="font-bold text-lg text-[var(--text-heading)]">Trần Văn Minh</h3>
                <div className="flex items-center gap-1">
                  <StarRating rating={4.9} size="sm" />
                  <span className="text-xs text-[var(--text-muted)]">4.9 • Honda Vision</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-surface-100 border border-surface-200 px-3 py-1 rounded-lg text-sm font-bold tracking-wider mb-1">
                29A-123.45
              </div>
              <p className="text-xs text-[var(--text-muted)]">Màu xanh đen</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/messages/2" className="flex-1">
              <button className="w-full py-3 bg-surface-100 hover:bg-surface-200 text-[var(--text-heading)] rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                <IconMessage size={20} /> Nhắn tin
              </button>
            </Link>
            <button className="flex-[2] py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 transition-colors">
              <IconPhone size={20} /> Gọi điện
            </button>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}</style>
    </div>
  );
}
