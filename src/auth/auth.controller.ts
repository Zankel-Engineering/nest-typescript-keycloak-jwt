import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenSet } from 'openid-client';
import { RefreshCookiePayload } from './refresh-cookie-payload.interface';
import { AuthResponse } from './auth-response';
import { ApiOkResponse } from '@nestjs/swagger';
import { CookieOptions, Cookies } from '@nestjsplus/cookies';

interface AuthRequestPayload {
  username: string;
  password: string;
}

interface UdcCookies {
  udcAuthorization: string;
}

interface InterestingPartRequest {
  _cookies: Array<{name: keyof UdcCookies, value: string, options: CookieOptions}>
}

@Controller('auth')
export class AuthController {
  private static COOKIE_NAME: keyof UdcCookies = 'udcAuthorization';
  constructor(private authService: AuthService) {}

  /** Get access token payload with credentials */
  @Post('token')
  @ApiOkResponse({description: 'Get access token payload with credentials'})
  public async getTokenGrant(@Body() authPayload: AuthRequestPayload, @Req() request: InterestingPartRequest): Promise<AuthResponse> {
    const keycloakResponse: TokenSet = await this.authService.queryKeycloakWithCredentials(authPayload.username, authPayload.password);
    const refreshCookiePayload: RefreshCookiePayload = {refresh_token: keycloakResponse.refresh_token, expires_in: keycloakResponse.expires_in};
    this.setRefreshTokenPayloadOnRequest(request, refreshCookiePayload);
    return AuthService.mapKeycloakResponseToAuthResponse(keycloakResponse);
  }

  /** Get access token payload with authorization cookie */
  @Get('token')
  @ApiOkResponse({description: 'Get access token payload with authorization cookie'})
  public async getToken(@Cookies() cookies: UdcCookies, @Req() request: InterestingPartRequest): Promise<AuthResponse> {
    const keycloakResponse: TokenSet = await this.authService.queryKeycloakWithRefreshToken(cookies.udcAuthorization);
    const refreshCookiePayload: RefreshCookiePayload = {refresh_token: keycloakResponse.refresh_token, expires_in: keycloakResponse.expires_in};
    this.setRefreshTokenPayloadOnRequest(request, refreshCookiePayload);
    return AuthService.mapKeycloakResponseToAuthResponse(keycloakResponse);
  }

  private setRefreshTokenPayloadOnRequest(request: InterestingPartRequest, refreshCookiePayload: RefreshCookiePayload): void {
    request._cookies = [{
      name: AuthController.COOKIE_NAME,
      value: JSON.stringify(refreshCookiePayload),
      options: {
        httpOnly: true,
        sameSite: false,
        expires: new Date(refreshCookiePayload.expires_in * 1000),
      },
    }];
  }
}
