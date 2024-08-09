export class LocalTokenStore {
    tokens = null;
    async setTokens(tokens) {
        this.tokens = tokens;
        return true;
    }
    async getAccessToken() {
        return this.tokens ? this.tokens.access_token : undefined;
    }
    async getRefreshToken() {
        return this.tokens ? this.tokens.refresh_token : undefined;
    }
}
