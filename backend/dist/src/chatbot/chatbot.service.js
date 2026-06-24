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
var ChatbotService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const genai_1 = require("@google/genai");
let ChatbotService = ChatbotService_1 = class ChatbotService {
    prisma;
    logger = new common_1.Logger(ChatbotService_1.name);
    aiClient;
    constructor(prisma) {
        this.prisma = prisma;
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.aiClient = new genai_1.GoogleGenAI({ apiKey });
        }
    }
    getSystemInstruction() {
        return `Bạn là trợ lý ảo của Parago — nền tảng đi chung xe cho sinh viên đại học.
Nhiệm vụ của bạn: Chỉ trả lời các câu hỏi liên quan tới cách sử dụng app, tính năng, an toàn, chính sách của Parago. Trả lời ngắn gọn, thân thiện, bằng tiếng Việt. Không xưng hô máy móc.
Nếu được hỏi điều gì ngoài phạm vi app (không liên quan Parago, code, toán học v.v.), lịch sự từ chối và hướng người dùng quay lại chủ đề app.

Thông tin nền về Parago:
- Ứng dụng giúp sinh viên tìm và đăng chuyến đi chung xe (xe máy, ô tô) để tiết kiệm chi phí và bảo vệ môi trường.
- Người dùng có thể đăng ký bằng email trường đại học để được xác thực (Verified badge).
- 2 Chế độ đi chung: 
  + Giao lưu (Community): Đi chung miễn phí, chia sẻ niềm vui.
  + Chia sẻ chi phí (Gas & Tip): Người đi chung đóng góp tiền xăng xe (giá do sinh viên tự thương lượng, rất rẻ).
- Tính năng ghép xe thông minh: Ưu tiên cùng trường, cùng giờ, gần điểm đón.
- Có tính năng SOS khẩn cấp trong phần Live Tracking (chia sẻ vị trí thực thời gian).
- Parago Premium (Bạn Đồng Hành): Tính năng trả phí cho phép thiết lập chuyến đi định kỳ, tuỳ chọn ghép cùng giới tính, tự động ghép điểm đón tối ưu, được tăng Trust Score.`;
    }
    async handleUserMessage(userId, content) {
        if (!this.aiClient) {
            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey) {
                this.aiClient = new genai_1.GoogleGenAI({ apiKey });
            }
            else {
                throw new common_1.HttpException('Chatbot hiện đang bảo trì (Thiếu cấu hình).', common_1.HttpStatus.SERVICE_UNAVAILABLE);
            }
        }
        try {
            await this.prisma.chatbotMessage.create({
                data: {
                    userId,
                    role: 'user',
                    content,
                }
            });
            const history = await this.prisma.chatbotMessage.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                take: 10,
            });
            history.reverse();
            const contents = history.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));
            let replyText = "";
            try {
                const response = await this.aiClient.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents,
                    config: {
                        systemInstruction: this.getSystemInstruction(),
                        temperature: 0.7,
                        maxOutputTokens: 800,
                    }
                });
                replyText = response.text || "Xin lỗi, tôi chưa thể trả lời câu hỏi này.";
            }
            catch (genAiError) {
                this.logger.error('Gemini API Error:', genAiError);
                if (genAiError.status === 429 || genAiError.message?.includes('429')) {
                    throw new common_1.HttpException('Trợ lý đang bận, vui lòng thử lại sau giây lát.', common_1.HttpStatus.TOO_MANY_REQUESTS);
                }
                throw new common_1.HttpException('Lỗi khi kết nối với hệ thống Trợ lý.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const botMessage = await this.prisma.chatbotMessage.create({
                data: {
                    userId,
                    role: 'assistant',
                    content: replyText,
                }
            });
            return {
                success: true,
                data: botMessage
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error('ChatbotService Error:', error);
            throw new common_1.HttpException('Đã có lỗi xảy ra khi xử lý tin nhắn.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getHistory(userId) {
        const messages = await this.prisma.chatbotMessage.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
        });
        return {
            success: true,
            data: messages
        };
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = ChatbotService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map