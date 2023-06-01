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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
async function createPostgreSQLConnection() {
    const manager = (0, typeorm_1.getManager)();
    const query = manager.createQueryBuilder()
        .insert()
        .into('gago')
        .values([
        { mek: 1 },
        { mek: 2 },
    ]);
    console.log('-----------------------------------', { rawSql: query.getSql() });
    const answer = query.execute();
    console.log({ answer }, '------------------------------------');
    console.log('PostgreSQL connection created');
    return answer;
}
let UserService = class UserService {
    constructor() {
    }
    async getData() {
        const res = await createPostgreSQLConnection();
        return JSON.stringify(res);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=db.service.js.map