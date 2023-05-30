"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: ['http://localhost:3000', '*']
        }
    });
    await app.listen(7000, () => { console.log("server is listening on port 7000!"); });
}
bootstrap();
//# sourceMappingURL=main.js.map