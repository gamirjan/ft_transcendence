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
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const UserFriend_service_1 = require("./UserFriend.service");
const common_2 = require("@nestjs/common");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    async findAll(userId, res) {
        return res.send(await this.friendService.getUserFriends(userId));
    }
    async addFriend(payload, res) {
        const { userid, friendid } = payload;
        return res.send(await this.friendService.addFriend(userid, friendid));
    }
    async remove(userFriendId, res) {
        return res.send(await this.friendService.removeFriend(userFriendId));
    }
};
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Delete)(':userFriendId'),
    __param(0, (0, common_1.Param)('userFriendId')),
    __param(1, (0, common_2.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "remove", null);
FriendController = __decorate([
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [UserFriend_service_1.UserFriendService])
], FriendController);
exports.FriendController = FriendController;
//# sourceMappingURL=UserFriend.controller.js.map