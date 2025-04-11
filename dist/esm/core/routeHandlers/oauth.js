// src/core/routeHandlers/oauth.ts
import {
  InvalidOAuthAlgorithm,
  InvalidOAuthResource,
  InvalidProvider
} from "../errors/consoleErrors.js";
import { OIDCAuthorization } from "../protocols/oauth/oidc_authorization.js";
import { OAuth2Authorization } from "../protocols/oauth/oauth2_authorization.js";
import { OIDCCallback } from "../protocols/oauth/oidc_callback.js";
import { OAuth2Callback } from "../protocols/oauth/oauth2_callback.js";
function OAuthHandlers(pluginType, request, resource, provider, sessionCallBack, clientOrigin) {
  if (!provider) {
    throw new InvalidProvider;
  }
  switch (resource) {
    case "authorization":
      switch (provider.algorithm) {
        case "oidc":
          return OIDCAuthorization(pluginType, request, provider, clientOrigin);
        case "oauth2":
          return OAuth2Authorization(pluginType, request, provider);
        default:
          throw new InvalidOAuthAlgorithm;
      }
    case "callback":
      switch (provider.algorithm) {
        case "oidc":
          return OIDCCallback(pluginType, request, provider, sessionCallBack);
        case "oauth2":
          return OAuth2Callback(pluginType, request, provider, sessionCallBack);
        default:
          throw new InvalidOAuthAlgorithm;
      }
    default:
      throw new InvalidOAuthResource;
  }
}
export {
  OAuthHandlers
};
