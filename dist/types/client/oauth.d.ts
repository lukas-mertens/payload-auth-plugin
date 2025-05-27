import { AuthPluginOutput } from "../types.js";
type BaseOptions = {
    name: string;
    flow?: 'popup' | 'redirect';
};
export type OauthProvider = "google" | "github" | "apple" | "cognito" | "gitlab" | "msft-entra" | "slack" | "atlassian" | "auth0" | "discord" | "facebook" | "jumpcloud" | "twitch";
export declare const oauth: (options: BaseOptions, provider: OauthProvider) => Promise<AuthPluginOutput> | void;
export {};
//# sourceMappingURL=oauth.d.ts.map