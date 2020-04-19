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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const cookies_1 = require("@nestjsplus/cookies");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getTokenGrant(authPayload, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const keycloakResponse = yield this.authService.queryKeycloakWithCredentials(authPayload.username, authPayload.password);
            const refreshCookiePayload = { refresh_token: keycloakResponse.refresh_token, expires_in: keycloakResponse.expires_in };
            this.setRefreshTokenPayloadOnRequest(request, refreshCookiePayload);
            return auth_service_1.AuthService.mapKeycloakResponseToAuthResponse(keycloakResponse);
        });
    }
    getToken(cookies, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const keycloakResponse = yield this.authService.queryKeycloakWithRefreshToken(cookies.udcAuthorization);
            const refreshCookiePayload = { refresh_token: keycloakResponse.refresh_token, expires_in: keycloakResponse.expires_in };
            this.setRefreshTokenPayloadOnRequest(request, refreshCookiePayload);
            return auth_service_1.AuthService.mapKeycloakResponseToAuthResponse(keycloakResponse);
        });
    }
    setRefreshTokenPayloadOnRequest(request, refreshCookiePayload) {
        request._cookies = [{
                name: AuthController_1.COOKIE_NAME,
                value: JSON.stringify(refreshCookiePayload),
                options: {
                    httpOnly: true,
                    sameSite: false,
                    expires: new Date(refreshCookiePayload.expires_in * 1000),
                },
            }];
    }
};
AuthController.COOKIE_NAME = 'udcAuthorization';
__decorate([
    common_1.Post('token'),
    swagger_1.ApiOkResponse({ description: 'Get access token payload with credentials' }),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getTokenGrant", null);
__decorate([
    common_1.Get('token'),
    swagger_1.ApiOkResponse({ description: 'Get access token payload with authorization cookie' }),
    __param(0, cookies_1.Cookies()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getToken", null);
AuthController = AuthController_1 = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map