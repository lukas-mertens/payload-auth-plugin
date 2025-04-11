import { type PayloadRequest } from "payload";
import type { OAuth2ProviderConfig, AccountInfo } from "../../../types.js";
export declare function OAuth2Callback(pluginType: string, request: PayloadRequest, providerConfig: OAuth2ProviderConfig, session_callback: (oauthAccountInfo: AccountInfo, clientOrigin: string) => Promise<Response>): Promise<Response>;
//# sourceMappingURL=oauth2_callback.d.ts.map