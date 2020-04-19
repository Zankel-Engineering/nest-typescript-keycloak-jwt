import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, Issuer, TokenSet } from 'openid-client';
import { token } from 'morgan';
import { AuthResponse } from './auth-response';

@Injectable()
export class AuthService implements OnModuleInit {

    /** Mapper for keycloak response to auth response */
    public static mapKeycloakResponseToAuthResponse(keycloakResponse: TokenSet): AuthResponse {
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
        const keycloakIssuer: Issuer<Client> = await Issuer.discover(process.env.KEYCLOAK_ISSUER || 'https://auth.untergrunddating.club/auth/realms/udc');
        this.client = new keycloakIssuer.Client({
            client_id: process.env.KEYCLOAK_CLIENT_ID || '60-30', // Same as `clientId` passed to client.auth()
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
            Logger.error('There was error granting access to a user', e.toString(), AuthService.name, true);
        }
        return tokenSet;
    }

    /** Refresh the token */
    public async queryKeycloakWithRefreshToken(refreshToken: string): Promise<TokenSet> {
        let tokenSet;
        try {
            tokenSet = await this.client.refresh(refreshToken);
        } catch (e) {
            Logger.error('There was an error trying to refresh a token', e.toString(), AuthService.name, true);
        }
        return tokenSet;
    }

}
