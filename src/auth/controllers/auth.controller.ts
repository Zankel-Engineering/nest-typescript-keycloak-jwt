import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TokenSet } from 'openid-client';
import { RefreshCookiePayload } from '../interfaces/refresh-cookie-payload.interface';
import { AuthResponseDto } from '../dto/auth-response-dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Cookies, CookieSettings } from '@nestjsplus/cookies';
import { AuthRequestPayloadDto } from '../dto/auth-request-payload.dto';
import * as moment from 'moment';
import { Response } from 'express';

interface UdcCookies {
  udcAuthorization: string;
}

@Controller('auth')
export class AuthController {
  private static COOKIE_NAME: keyof UdcCookies = 'udcAuthorization';
  constructor(private authService: AuthService) {}

  /** Get access token payload with credentials */
  @Post('token')
  @ApiOkResponse({description: 'Get access token payload with credentials'})
  @ApiUnauthorizedResponse({description: 'Credentials not valid'})
  public async getTokenGrant(@Body() authPayload: AuthRequestPayloadDto, @Res() res: Response): Promise<Response<AuthResponseDto>> {
    const keycloakResponse: TokenSet = await this.authService.queryKeycloakWithCredentials(authPayload.username, authPayload.password);
    const refreshCookiePayload: RefreshCookiePayload = {
      refresh_token: keycloakResponse.refresh_token,
      expires: AuthService.getRefreshTokenExpires(keycloakResponse.refresh_token),
    };
    res = this.setRefreshTokenPayloadOnRequest(res, refreshCookiePayload);
    return res.status(HttpStatus.OK).send(AuthService.mapKeycloakResponseToAuthResponse(keycloakResponse));
  }

  /** Get access token payload with authorization cookie */
  @Get('token')
  @ApiOkResponse({description: 'Get access token payload with authorization cookie'})
  public async getToken(@Cookies() cookies: UdcCookies, @Res() res: Response): Promise<Response<AuthResponseDto>> {
    const keycloakResponse: TokenSet = await this.authService.queryKeycloakWithRefreshToken(JSON.parse(cookies.udcAuthorization));
    const refreshCookiePayload: RefreshCookiePayload = {
      refresh_token: keycloakResponse.refresh_token,
      expires: AuthService.getRefreshTokenExpires(keycloakResponse.refresh_token),
    };
    res = this.setRefreshTokenPayloadOnRequest(res, refreshCookiePayload);
    return res.status(HttpStatus.OK).send(AuthService.mapKeycloakResponseToAuthResponse(keycloakResponse));
  }

  private setRefreshTokenPayloadOnRequest(res: Response, refreshCookiePayload: RefreshCookiePayload): Response {
    res.cookie(AuthController.COOKIE_NAME, JSON.stringify(refreshCookiePayload), {
      httpOnly: true,
      sameSite: false,
      expires: refreshCookiePayload.expires ? moment.unix(refreshCookiePayload.expires).toDate() : new Date(),
    });
    return res;
  }
}
