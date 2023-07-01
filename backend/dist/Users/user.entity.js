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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const ChannelAdmin_entity_1 = require("../ChannelAdmins/ChannelAdmin.entity");
const ChannelMessage_entity_1 = require("../ChannelMessages/ChannelMessage.entity");
const Channel_entity_1 = require("../Channels/Channel.entity");
const ChannelUser_entity_1 = require("../ChannelUsers/ChannelUser.entity");
const GameHistory_entity_1 = require("../GameHistory/GameHistory.entity");
const MuteList_entity_1 = require("../MuteList/MuteList.entity");
const UserFriend_entity_1 = require("../UserFriend/UserFriend.entity");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "id_42", nullable: true, unique: true }),
    __metadata("design:type", Number)
], User.prototype, "id_42", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "displayname",
        nullable: true,
        unique: true,
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "displayname", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "email",
        nullable: true,
        unique: true,
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "avatarurl", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatarurl", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "isverified", nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isverified", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "istwofactorenabled", nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "istwofactorenabled", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "wins", nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "wins", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "losses", nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "losses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChannelAdmin_entity_1.ChannelAdmin, (channeladmins) => channeladmins.admin),
    __metadata("design:type", Array)
], User.prototype, "channeladmins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChannelMessage_entity_1.Channelmessage, (channelmessages) => channelmessages.user),
    __metadata("design:type", Array)
], User.prototype, "channelmessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Channel_entity_1.Channel, (channels) => channels.owner),
    __metadata("design:type", Array)
], User.prototype, "channels", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChannelUser_entity_1.ChannelUser, (channelusers) => channelusers.user),
    __metadata("design:type", Array)
], User.prototype, "channelusers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GameHistory_entity_1.Gamehistory, (gamehistory) => gamehistory.user),
    __metadata("design:type", Array)
], User.prototype, "gamehistories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GameHistory_entity_1.Gamehistory, (gamehistory) => gamehistory.user2),
    __metadata("design:type", Array)
], User.prototype, "gamehistories2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MuteList_entity_1.Mutelist, (mutelist) => mutelist.user),
    __metadata("design:type", Array)
], User.prototype, "mutelists", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserFriend_entity_1.UserFriend, (userfriends) => userfriends.friend),
    __metadata("design:type", Array)
], User.prototype, "userfriends", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserFriend_entity_1.UserFriend, (userfriends) => userfriends.user),
    __metadata("design:type", Array)
], User.prototype, "userfriends2", void 0);
User = __decorate([
    (0, typeorm_1.Index)("users_displayname_key", ["displayname"], { unique: true }),
    (0, typeorm_1.Index)("users_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Index)("users_42Id_key", ["id_42"], { unique: true }),
    (0, typeorm_1.Entity)("users", { schema: "public" })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map