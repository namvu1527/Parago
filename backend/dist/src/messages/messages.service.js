"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MessagesService = class MessagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createConversation(userId, targetUserId, rideId) {
        if (userId === targetUserId) {
            throw new common_1.ForbiddenException('Cannot create conversation with yourself');
        }
        const existingConvos = await this.prisma.conversation.findMany({
            where: {
                AND: [
                    { participants: { some: { userId } } },
                    { participants: { some: { userId: targetUserId } } }
                ]
            },
            include: {
                participants: true
            }
        });
        let existingConversation = existingConvos.find(c => c.participants.length === 2);
        if (rideId) {
            const exactRideConvo = existingConvos.find(c => c.participants.length === 2 && c.rideId === rideId);
            if (exactRideConvo) {
                existingConversation = exactRideConvo;
            }
        }
        if (existingConversation) {
            return { id: existingConversation.id };
        }
        const newConvo = await this.prisma.conversation.create({
            data: {
                rideId,
                participants: {
                    create: [
                        { userId },
                        { userId: targetUserId }
                    ]
                }
            }
        });
        return { id: newConvo.id };
    }
    async getConversations(userId) {
        const conversations = await this.prisma.conversation.findMany({
            where: {
                participants: { some: { userId } }
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: { id: true, name: true, avatarUrl: true }
                        }
                    }
                },
                _count: {
                    select: {
                        messages: {
                            where: {
                                isRead: false,
                                senderId: { not: userId }
                            }
                        }
                    }
                }
            },
            orderBy: [
                { lastMessageAt: 'desc' },
                { createdAt: 'desc' }
            ]
        });
        return conversations.map(c => {
            const otherParticipant = c.participants.find(p => p.userId !== userId)?.user;
            return {
                id: c.id,
                rideId: c.rideId,
                lastMessageAt: c.lastMessageAt,
                lastMessageText: c.lastMessageText,
                createdAt: c.createdAt,
                unreadCount: c._count.messages,
                otherUser: otherParticipant
            };
        });
    }
    async getMessages(conversationId, userId, skip = 0, take = 20) {
        const participant = await this.prisma.conversationParticipant.findUnique({
            where: {
                conversationId_userId: { conversationId, userId }
            },
            include: {
                conversation: {
                    include: {
                        participants: {
                            where: { userId: { not: userId } },
                            include: { user: { select: { id: true, name: true, avatarUrl: true } } }
                        }
                    }
                }
            }
        });
        if (!participant) {
            throw new common_1.ForbiddenException('Not a participant in this conversation');
        }
        const messages = await this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'desc' },
            skip,
            take,
            include: {
                sender: { select: { id: true, name: true, avatarUrl: true } }
            }
        });
        const unreadMessagesIds = messages.filter(m => m.senderId !== userId && !m.isRead).map(m => m.id);
        if (unreadMessagesIds.length > 0) {
            await this.prisma.message.updateMany({
                where: { id: { in: unreadMessagesIds } },
                data: { isRead: true }
            });
            messages.forEach(m => {
                if (unreadMessagesIds.includes(m.id)) {
                    m.isRead = true;
                }
            });
        }
        const otherUser = participant.conversation.participants[0]?.user;
        return {
            conversation: {
                ...participant.conversation,
                otherUser
            },
            messages: messages.reverse()
        };
    }
    async saveMessage(conversationId, senderId, text, type = 'text') {
        const message = await this.prisma.message.create({
            data: {
                conversationId,
                senderId,
                text,
                type
            },
            include: {
                sender: { select: { id: true, name: true, avatarUrl: true } }
            }
        });
        await this.prisma.conversation.update({
            where: { id: conversationId },
            data: {
                lastMessageAt: new Date(),
                lastMessageText: text
            }
        });
        return message;
    }
    async markAsRead(conversationId, userId) {
        await this.prisma.message.updateMany({
            where: {
                conversationId,
                senderId: { not: userId },
                isRead: false
            },
            data: { isRead: true }
        });
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map