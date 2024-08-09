var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class LocalTokenStore {
    constructor() {
        this.tokens = null;
    }
    setTokens(tokens) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tokens = tokens;
            return true;
        });
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokens ? this.tokens.access_token : undefined;
        });
    }
    getRefreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokens ? this.tokens.refresh_token : undefined;
        });
    }
}
