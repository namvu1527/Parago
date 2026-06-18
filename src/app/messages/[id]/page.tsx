"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, Input, Button } from "@/components/ui";
import { mockConversations, mockMessages, mockRides, currentUser } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";
import {
  IconChevronLeft,
  IconPhone,
  IconSend,
  IconMoodSmile,
  IconPhoto,
  IconInfoCircle,
  IconCar,
} from "@tabler/icons-react";

export default function ChatScreen() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const conversation = mockConversations.find((c) => c.id === id) || mockConversations[0];
  const ride = mockRides.find((r) => r.id === conversation.rideId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<any[]>((mockMessages as any)[id] || []);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text: inputText,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    
    // Simulate reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          senderId: conversation.participant.id,
          text: "Ok bạn nhé, mình hiểu rồi.",
          time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-primary)]">
      {/* CUSTOM HEADER */}
      <header className="sticky top-0 z-30 glass-strong safe-top">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center hover:bg-surface-100 transition-colors"
            >
              <IconChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar
                  name={conversation.participant.name}
                  size="md"
                  verified={conversation.participant.verified}
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--bg-card)] rounded-full" />
              </div>
              <div>
                <h2 className="font-semibold text-sm text-[var(--text-heading)]">{conversation.participant.name}</h2>
                <p className="text-xs text-green-500 font-medium">Đang hoạt động</p>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-surface-100 text-primary-500 flex items-center justify-center hover:bg-primary-50 transition-colors">
            <IconPhone size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* RIDE CONTEXT CARD */}
        {ride && (
          <div className="bg-surface-0 rounded-2xl p-4 shadow-sm border border-[var(--border-default)] mx-auto max-w-md w-full mb-6">
            <div className="flex items-center justify-between mb-3 border-b border-[var(--border-default)] pb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-heading)]">
                <IconCar size={16} className="text-primary-500" />
                Chuyến đi sắp tới
              </div>
              <span className="text-sm font-bold text-primary-500">{formatCurrency(ride.price)}</span>
            </div>
            <div className="flex gap-3">
               <div className="flex flex-col items-center mt-1">
                 <div className="w-2 h-2 rounded-full bg-primary-500" />
                 <div className="w-0.5 h-6 bg-surface-200 my-0.5" />
                 <div className="w-2 h-2 rounded-full bg-gold-500" />
               </div>
               <div className="flex-1">
                 <p className="text-sm font-medium">{ride.pickupShort}</p>
                 <p className="text-sm font-medium mt-3">{ride.destinationShort}</p>
               </div>
               <div className="text-right text-xs text-[var(--text-muted)]">
                 <p>{ride.date}</p>
                 <p className="mt-4">{ride.departureTime}</p>
               </div>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Privacy Notice */}
          <div className="flex justify-center mb-6">
            <div className="bg-warning-50 dark:bg-warning-500/10 text-warning-600 text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5">
              <IconInfoCircle size={14} />
              Số điện thoại đã được ẩn để bảo vệ quyền riêng tư
            </div>
          </div>

          <AnimatePresence>
            {messages.map((msg: any, index: number) => {
              const isMine = msg.senderId === currentUser.id;
              const isSystem = msg.senderId === "system";
              
              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-4">
                    <span className="text-xs text-[var(--text-muted)] bg-surface-100 px-3 py-1 rounded-full">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              // Grouping logic for rounded corners
              const isFirstInGroup = index === 0 || messages[index - 1]?.senderId !== msg.senderId;
              const isLastInGroup = index === messages.length - 1 || messages[index + 1]?.senderId !== msg.senderId;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", isMine ? "justify-end" : "justify-start")}
                >
                  <div className="flex items-end gap-2 max-w-[75%]">
                    {!isMine && isLastInGroup && (
                      <Avatar name={conversation.participant.name} size="xs" className="mb-1" />
                    )}
                    {!isMine && !isLastInGroup && <div className="w-6 shrink-0" />}

                    <div
                      className={cn(
                        "px-4 py-2.5 text-sm",
                        isMine 
                          ? "bg-primary-500 text-white" 
                          : "bg-surface-100 dark:bg-surface-200 text-[var(--text-heading)]",
                        isMine ? "rounded-l-2xl rounded-tr-2xl" : "rounded-r-2xl rounded-tl-2xl",
                        isMine && isLastInGroup && "rounded-br-sm",
                        !isMine && isLastInGroup && "rounded-bl-sm",
                      )}
                    >
                      {msg.text}
                      <div className={cn(
                        "text-[10px] text-right mt-1 opacity-70",
                        isMine ? "text-white" : "text-[var(--text-muted)]"
                      )}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex items-end gap-2">
                <Avatar name={conversation.participant.name} size="xs" className="mb-1" />
                <div className="bg-surface-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* INPUT BAR */}
      <footer className="bg-[var(--bg-card)] border-t border-[var(--border-default)] safe-bottom p-3">
        <div className="max-w-3xl mx-auto flex items-end gap-2">
          <button className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-primary-500 hover:bg-surface-100 transition-colors">
            <IconPhoto size={22} />
          </button>
          <div className="flex-1 bg-surface-100 dark:bg-surface-200 rounded-2xl flex items-end pr-2 min-h-[44px]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Nhắn tin..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-4 resize-none max-h-32 text-[var(--text-heading)]"
              rows={1}
            />
            <button className="w-9 h-9 shrink-0 mb-1 rounded-full flex items-center justify-center text-surface-500 hover:text-primary-500 transition-colors">
              <IconMoodSmile size={20} />
            </button>
          </div>
          {inputText.trim() ? (
            <button 
              onClick={handleSend}
              className="w-11 h-11 shrink-0 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-600 transition-colors"
            >
              <IconSend size={20} className="-ml-0.5" />
            </button>
          ) : (
            <button className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-surface-400">
              <IconSend size={20} className="-ml-0.5" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
