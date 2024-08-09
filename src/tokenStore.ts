// src/tokenStore.ts
import { TuyaTokenStorInterface, TuyaTokensSave } from '@tuya/tuya-connector-nodejs';

export class LocalTokenStore implements TuyaTokenStorInterface {
  private tokens: TuyaTokensSave | null = null;

  async setTokens(tokens: TuyaTokensSave): Promise<boolean> {
    this.tokens = tokens;
    return true;
  }

  async getAccessToken(): Promise<string | undefined> {
    return this.tokens ? this.tokens.access_token : undefined;
  }

  async getRefreshToken(): Promise<string | undefined> {
    return this.tokens ? this.tokens.refresh_token : undefined;
  }
}
