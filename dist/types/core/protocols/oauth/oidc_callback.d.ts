import { type PayloadRequest } from "payload";
import type { AccountInfo, OIDCProviderConfig } from "../../../types.js";
export declare function OIDCCallback(pluginType: string, request: PayloadRequest, providerConfig: OIDCProviderConfig, session_callback: (oauthAccountInfo: AccountInfo, clientOrigin: string) => Promise<Response>): Promise<Response>;
//# sourceMappingURL=oidc_callback.d.ts.map