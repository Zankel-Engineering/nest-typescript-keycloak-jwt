import { AuthService } from './auth.service';
import { AuthResponse } from './auth-response';
import { CookieOptions } from '@nestjsplus/cookies';
interface AuthRequestPayload {
    username: string;
    password: string;
}
interface UdcCookies {
    udcAuthorization: string;
}
interface InterestingPartRequest {
    _cookies: Array<{
        name: keyof UdcCookies;
        value: string;
        options: CookieOptions;
    }>;
}
export declare class AuthController {
    private authService;
    private static COOKIE_NAME;
    constructor(authService: AuthService);
    getTokenGrant(authPayload: AuthRequestPayload, request: InterestingPartRequest): Promise<AuthResponse>;
    getToken(cookies: UdcCookies, request: InterestingPartRequest): Promise<AuthResponse>;
    private setRefreshTokenPayloadOnRequest;
}
export {};
