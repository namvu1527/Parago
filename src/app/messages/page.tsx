"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppLayout, AppHeader } from "@/components/layout";
import { Avatar, Input, Badge, EmptyState } from "@/components/ui";
import { mockConversations, type Conversation } from "@/lib/mock-data";
import { IconSearch, IconMessageOff, IconCircleCheckFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter((c) =>
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <AppHeader title="Tin nhắn" />

      <div className="max-w-2xl mx-auto px-4 py-4 pb-24">
        <div className="mb-6">
          <Input
            placeholder="Tìm kiếm tin nhắn..."
            icon={<IconSearch size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredConversations.length === 0 ? (
          <EmptyState
            icon={<IconMessageOff size={32} />}
            title="Không tìm thấy tin nhắn"
            description="Hãy bắt đầu ghép xe để trò chuyện với những người bạn đồng hành mới nhé."
          />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-1"
          >
            {filteredConversations.map((conv) => (
              <motion.div key={conv.id} variants={itemVariants}>
                <Link
                  href={`/messages/${conv.id}`}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-50 dark:hover:bg-surface-100 transition-colors relative group"
                >
                  <div className="relative">
                    <Avatar
                      name={conv.participant.name}
                      size="lg"
                      verified={conv.participant.verified}
                      premium={conv.participant.isPremium}
                    />
                    {/* Active indicator placeholder */}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[var(--bg-card)] rounded-full z-10" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-base text-[var(--text-heading)] truncate pr-4">
                        {conv.participant.name}
                      </h4>
                      <span className={cn(
                        "text-xs whitespace-nowrap",
                        conv.unreadCount > 0 ? "text-primary-500 font-semibold" : "text-[var(--text-muted)]"
                      )}>
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={cn(
                        "text-sm truncate",
                        conv.unreadCount > 0 ? "text-[var(--text-heading)] font-semibold" : "text-[var(--text-secondary)]"
                      )}>
                        {conv.lastMessage}
                      </p>
                      {conv.unreadCount > 0 ? (
                        <div className="w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </div>
                      ) : (
                        <IconCircleCheckFilled size={14} className="text-surface-300 shrink-0" />
                      )}
                    </div>
                  </div>
                  
                  {/* Swipe hint (visible on hover) */}
                  <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center cursor-pointer hover:bg-surface-300 transition-colors">
                      <IconSearch size={14} className="text-surface-600" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
