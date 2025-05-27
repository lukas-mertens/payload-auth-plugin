import type { PayloadRequest } from "payload";
import type { AccountInfo, OAuthProviderConfig } from "../../types.js";
export declare function OAuthHandlers(pluginType: string, request: PayloadRequest, resource: string, provider: OAuthProviderConfig, sessionCallBack: (oauthAccountInfo: AccountInfo, clientOrigin: string) => Promise<Response>, clientOrigin?: string): Promise<Response>;
//# sourceMappingURL=oauth.d.ts.map