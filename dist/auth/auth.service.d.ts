import { OnModuleInit } from '@nestjs/common';
import { TokenSet } from 'openid-client';
import { AuthResponse } from './auth-response';
export declare class AuthService implements OnModuleInit {
    static mapKeycloakResponseToAuthResponse(keycloakResponse: TokenSet): AuthResponse;
    private client;
    onModuleInit(): Promise<void>;
    queryKeycloakWithCredentials(username: string, password: string): Promise<TokenSet>;
    queryKeycloakWithRefreshToken(refreshToken: string): Promise<TokenSet>;
}
