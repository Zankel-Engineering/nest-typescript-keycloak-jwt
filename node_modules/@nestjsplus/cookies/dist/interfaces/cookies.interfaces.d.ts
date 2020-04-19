export interface CookieOptions {
    domain?: string;
    encode?: (val: string) => string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    secure?: boolean;
    signed?: boolean;
    sameSite?: boolean | string;
}
export interface CookieSettings {
    name: string;
    value?: string;
    options?: CookieOptions;
}
