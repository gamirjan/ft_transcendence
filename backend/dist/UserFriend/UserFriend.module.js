"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersFriendModule = void 0;
const user_entity_1 = require("../Users/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../Users/user.repository");
const UserFriend_entity_1 = require("./UserFriend.entity");
const UserFriend_controller_1 = require("./UserFriend.controller");
const UserFriend_service_1 = require("./UserFriend.service");
const common_1 = require("@nestjs/common");
let UsersFriendModule = class UsersFriendModule {
};
UsersFriendModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_repository_1.UserRepository, UserFriend_entity_1.UserFriend])],
        controllers: [UserFriend_controller_1.FriendController],
        providers: [UserFriend_service_1.UserFriendService, user_repository_1.UserRepository],
    })
], UsersFriendModule);
exports.UsersFriendModule = UsersFriendModule;
//# sourceMappingURL=UserFriend.module.js.map