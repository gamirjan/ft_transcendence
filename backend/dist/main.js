"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "*"
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Transcendence')
        .setDescription('Transcendence API')
        .setVersion('1.0')
        .addTag('ts')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(7000, () => { console.log("server is listening on port 7000!"); });
}
bootstrap();
//# sourceMappingURL=main.js.map