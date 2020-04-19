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
const api_model_property_decorator_1 = require("@nestjs/swagger/dist/decorators/api-model-property.decorator");
class AuthResponse {
}
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ required: true }),
    __metadata("design:type", String)
], AuthResponse.prototype, "access_token", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ required: true }),
    __metadata("design:type", Number)
], AuthResponse.prototype, "expires_in", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ required: true }),
    __metadata("design:type", String)
], AuthResponse.prototype, "token_type", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ required: true }),
    __metadata("design:type", String)
], AuthResponse.prototype, "session_state", void 0);
__decorate([
    api_model_property_decorator_1.ApiModelProperty({ required: true }),
    __metadata("design:type", String)
], AuthResponse.prototype, "scope", void 0);
exports.AuthResponse = AuthResponse;
//# sourceMappingURL=auth-response.js.map