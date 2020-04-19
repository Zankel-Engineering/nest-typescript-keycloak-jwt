"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const openid_client_1 = require("openid-client");
let AuthService = AuthService_1 = class AuthService {
    static mapKeycloakResponseToAuthResponse(keycloakResponse) {
        return {
            access_token: keycloakResponse.access_token,
            expires_in: keycloakResponse.expires_at,
            token_type: keycloakResponse.token_type,
            session_state: keycloakResponse.session_state,
            scope: keycloakResponse.scope,
        };
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const keycloakIssuer = yield openid_client_1.Issuer.discover(process.env.KEYCLOAK_ISSUER || 'https://auth.untergrunddating.club/auth/realms/udc');
            this.client = new keycloakIssuer.Client({
                client_id: process.env.KEYCLOAK_CLIENT_ID || '60-30',
            });
        });
    }
    queryKeycloakWithCredentials(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenSet;
            try {
                tokenSet = yield this.client.grant({
                    grant_type: 'password',
                    username,
                    password,
                });
            }
            catch (e) {
                common_1.Logger.error('There was error granting access to a user', e.toString(), AuthService_1.name, true);
            }
            return tokenSet;
        });
    }
    queryKeycloakWithRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenSet;
            try {
                tokenSet = yield this.client.refresh(refreshToken);
            }
            catch (e) {
                common_1.Logger.error('There was an error trying to refresh a token', e.toString(), AuthService_1.name, true);
            }
            return tokenSet;
        });
    }
};
AuthService = AuthService_1 = __decorate([
    common_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map