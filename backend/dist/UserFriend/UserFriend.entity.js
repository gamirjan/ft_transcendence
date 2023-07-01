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
exports.UserFriend = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../Users/user.entity");
let UserFriend = class UserFriend {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
    __metadata("design:type", Number)
], UserFriend.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "userid", nullable: true, unique: true }),
    __metadata("design:type", Number)
], UserFriend.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "friendid", nullable: true, unique: true }),
    __metadata("design:type", Number)
], UserFriend.prototype, "friendid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (users) => users.userfriends),
    (0, typeorm_1.JoinColumn)([{ name: "friendid", referencedColumnName: "id" }]),
    __metadata("design:type", user_entity_1.User)
], UserFriend.prototype, "friend", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (users) => users.userfriends2),
    (0, typeorm_1.JoinColumn)([{ name: "userid", referencedColumnName: "id" }]),
    __metadata("design:type", user_entity_1.User)
], UserFriend.prototype, "user", void 0);
UserFriend = __decorate([
    (0, typeorm_1.Index)("unique_user_friend_pair", ["friendid", "userid"], { unique: true }),
    (0, typeorm_1.Index)("userfriends_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("userfriends", { schema: "public" })
], UserFriend);
exports.UserFriend = UserFriend;
//# sourceMappingURL=UserFriend.entity.js.map