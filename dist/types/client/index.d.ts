import { ForgotPasswordPayload, PasswordRecoverPayload, PasswordResetPayload } from "./password.js";
interface AppClientOptions {
    name: string;
    flow?: 'popup' | 'redirect';
}
export declare const appClient: (options: AppClientOptions) => {
    signin: () => {
        oauth: (provider: import("./oauth.js").OauthProvider) => Promise<void | import("../types.js").AuthPluginOutput>;
        passkey: () => Promise<void>;
        password: (payload: import("./password.js").PasswordSigninPayload) => Promise<import("../types.js").AuthPluginOutput>;
    };
    signup: () => {
        password: (paylaod: import("./password.js").PasswordSignupPayload) => Promise<import("../types.js").AuthPluginOutput>;
    };
    resetPassword: (payload: PasswordResetPayload) => Promise<import("../types.js").AuthPluginOutput>;
    forgotPassword: (payload: ForgotPasswordPayload) => Promise<import("../types.js").AuthPluginOutput>;
    passwordRecover: (payload: PasswordRecoverPayload) => Promise<import("../types.js").AuthPluginOutput>;
    refresh: () => Promise<import("../types.js").AuthPluginOutput>;
};
export declare const adminClient: () => {
    signin: () => {
        oauth: (provider: import("./oauth.js").OauthProvider) => Promise<void | import("../types.js").AuthPluginOutput>;
        passkey: () => void;
    };
};
export {};
//# sourceMappingURL=index.d.ts.map