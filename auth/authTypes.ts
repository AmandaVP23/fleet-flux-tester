export type KeycloakCredential = {
    realm: string;
    email: string;
    password: string;
};

export type TokenResponse = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
};
