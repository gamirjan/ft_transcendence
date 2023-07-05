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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUsersController = void 0;
const common_1 = require("@nestjs/common");
const addUser_dto_1 = require("./addUser.dto");
const addUser_service_1 = require("./addUser.service");
const decorators_1 = require("@nestjs/common/decorators");
let AddUsersController = class AddUsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto, res) {
        return res.send(await this.usersService.create(createUserDto));
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addUser_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AddUsersController.prototype, "create", null);
AddUsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [addUser_service_1.AddUsersService])
], AddUsersController);
exports.AddUsersController = AddUsersController;
//# sourceMappingURL=addUsers.controller.js.map