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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_handler_1 = require("./auth.handler");
const user_service_1 = require("../Users/user.service");
const addUser_service_1 = require("../AddUser/addUser.service");
let AuthController = class AuthController {
    constructor(userService, addUserService) {
        this.userService = userService;
        this.addUserService = addUserService;
    }
    async handleLogin(req, res) {
        try {
            console.log(req.body);
            const responseObject = {
                message: 'Login successful',
                data: req.body,
            };
            console.log("iddddddd", req.body.params.given_name);
            const is_user = true;
            return (responseObject);
        }
        catch (error) {
            return ({ error: 'Internal server error' });
        }
    }
    handleRedirect(req, res) {
        (0, auth_handler_1.googleOauthHandler)(req, res);
        console.log("done!");
        return { msg: 'OK' };
    }
    user(request) {
        console.log(request.user);
        if (request.user) {
            return { msg: 'Authenticated' };
        }
        else {
            return { msg: 'Not Authenticated' };
        }
    }
};
__decorate([
    (0, common_1.Post)('google/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Response]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.Get)('google/redirect'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleRedirect", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "user", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UsersService, addUser_service_1.AddUsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map