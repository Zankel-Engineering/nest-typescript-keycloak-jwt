import { Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Client, Issuer, TokenSet } from 'openid-client';
import { AuthResponseDto } from '../dto/auth-response-dto';
import * as jwt_decode from 'jwt-decode';
import { RefreshCookiePayload } from '../interfaces/refresh-cookie-payload.interface';

@Injectable()
export class AuthService implements OnModuleInit {

    /** Mapper for keycloak response to auth response */
    public static mapKeycloakResponseToAuthResponse(keycloakResponse: TokenSet): AuthResponseDto {
        return {
            access_token: keycloakResponse.access_token,
            expires_in: keycloakResponse.expires_at,
            token_type: keycloakResponse.token_type,
            session_state: keycloakResponse.session_state,
            scope: keycloakResponse.scope,
        };
    }
    private client: Client;

    /** @inheritDoc */
    public async onModuleInit(): Promise<void> {
        const keycloakIssuer: Issuer<Client> = await Issuer.discover(process.env.KEYCLOAK_ISSUER);
        this.client = new keycloakIssuer.Client({
            client_id: process.env.KEYCLOAK_CLIENT_ID, // Same as `clientId` passed to client.auth()
            client_secret: process.env.KEYCLOAK_SECRET,
        });
    }

    /** Query keycloak for credentials */
    public async queryKeycloakWithCredentials(username: string, password: string): Promise<TokenSet> {
        let tokenSet;
        try {
            tokenSet = await this.client.grant({
                grant_type: 'password',
                username,
                password,
            });
        } catch (e) {
            const errorMessage = 'There was error granting access to a user';
            Logger.error(errorMessage, e.toString(), AuthService.name, true);
            throw new UnauthorizedException(errorMessage);
        }
        return tokenSet;
    }

    /** Refresh the token */
    public async queryKeycloakWithRefreshToken(refreshCookiePayload: RefreshCookiePayload): Promise<TokenSet> {
        let tokenSet;
        try {
            tokenSet = await this.client.refresh(refreshCookiePayload.refresh_token);
        } catch (e) {
            const errorMessage = 'There was an error trying to refresh a token';
            Logger.error(errorMessage, e.toString(), AuthService.name, true);
            throw new UnauthorizedException(errorMessage);
        }
        return tokenSet;
    }

    /** Gets the refresh tokens expires */
    public static getRefreshTokenExpires(refreshToken: string | undefined): number {
        const decodedToken = jwt_decode(refreshToken);
        return decodedToken.exp;
    }

}
