import type {KeycloakCredential, TokenResponse} from "./authTypes.ts";
import {KEYCLOAK_URL} from "../utils/constants.ts";

const tokenCache = new Map<
    string,
    {
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }
>();

export async function loginKeycloak(
    cred: KeycloakCredential,
): Promise<string> {
    const clientId = 'web';
    const cacheKey = `${cred.realm}:${cred.email}:${clientId}`;
    const cached = tokenCache.get(cacheKey);

    const now = Date.now();

    // reuse token if still valid (with 30s buffer)
    if (cached && cached.expiresAt > now + 30_000) {
        return cached.accessToken;
    }

    const body = new URLSearchParams({
        grant_type: "password",
        client_id: clientId,
        username: cred.email,
        password: cred.password
    });

    const res = await fetch(
        `${KEYCLOAK_URL}/realms/${cred.realm}/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body
        }
    );

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Keycloak login failed: ${error}`);
    }

    const data = (await res.json()) as TokenResponse;

    tokenCache.set(cacheKey, {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: now + data.expires_in * 1000
    });

    return data.access_token;
}