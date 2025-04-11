import { PasswordSigninPayload } from "./password.js";
import { OauthProvider } from "./oauth.js";
interface BaseOptions {
    name: string;
    flow?: 'popup' | 'redirect';
}
export declare const appSignin: (options: BaseOptions) => {
    oauth: (provider: OauthProvider) => Promise<void | import("../types.js").AuthPluginOutput>;
    passkey: () => Promise<void>;
    password: (payload: PasswordSigninPayload) => Promise<import("../types.js").AuthPluginOutput>;
};
export declare const adminSignin: () => {
    oauth: (provider: OauthProvider) => Promise<void | import("../types.js").AuthPluginOutput>;
    passkey: () => void;
};
export {};
//# sourceMappingURL=signin.d.ts.map