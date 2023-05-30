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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const signal_service_1 = require("./signal.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("./ormconfig");
const user_controller_1 = require("./Users/user.controller");
const user_service_1 = require("./Users/user.service");
const users_module_1 = require("./Users/users.module");
const user_repository_1 = require("./Users/user.repository");
const user_entity_1 = require("./Users/user.entity");
const addUser_service_1 = require("./AddUser/addUser.service");
const addUsers_controller_1 = require("./AddUser/addUsers.controller");
const UserFriend_controller_1 = require("./UserFriend/UserFriend.controller");
const UserFriend_service_1 = require("./UserFriend/UserFriend.service");
const UserFriend_entity_1 = require("./UserFriend/UserFriend.entity");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
let AppModule = class AppModule {
    constructor() {
        console.log("app module called");
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default),
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_repository_1.UserRepository, UserFriend_entity_1.UserFriend]),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UsersController, addUsers_controller_1.AddUsersController, UserFriend_controller_1.FriendController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, signal_service_1.ShutdownService, user_service_1.UsersService, addUser_service_1.AddUsersService, UserFriend_service_1.UserFriendService, auth_service_1.AuthService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map