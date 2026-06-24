"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const notifications_service_1 = require("./src/notifications/notifications.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const notificationsService = app.get(notifications_service_1.NotificationsService);
    const userId = 'f2202528-ec2b-42eb-bf60-f13a23d7740b';
    console.log(`Sending test notification to ${userId}...`);
    await notificationsService.createNotification(userId, 'Yêu cầu được chấp nhận! 🎉', 'Tài xế Nguyễn Văn A đã chấp nhận yêu cầu ghép xe của bạn', 'RIDE_ACCEPTED', '/rides');
    console.log('Notification sent successfully!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=testNestEmit.js.map