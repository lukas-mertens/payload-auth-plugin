// src/plugins/admin.ts
import {
  EndpointsFactory,
  OAuthEndpointStrategy,
  PasskeyEndpointStrategy
} from "../core/endpoints.js";
import { PayloadSession } from "../core/session/payload.js";
import { InvalidServerURL } from "../core/errors/consoleErrors.js";
import { getOAuthProviders, getPasskeyProvider } from "../providers/utils.js";
import { preflightCollectionCheck } from "../core/preflights/collections.js";
var adminAuthPlugin = (pluginOptions) => (incomingConfig) => {
  const config = { ...incomingConfig };
  if (pluginOptions.enabled === false) {
    return config;
  }
  if (!config.serverURL) {
    throw new InvalidServerURL;
  }
  const { accountsCollectionSlug, providers, allowSignUp } = pluginOptions;
  preflightCollectionCheck([config.admin?.user, accountsCollectionSlug], config.collections);
  config.admin = {
    ...config.admin ?? {}
  };
  const session = new PayloadSession({
    accountsCollectionSlug,
    usersCollectionSlug: config.admin.user
  }, allowSignUp);
  const oauthProviders = getOAuthProviders(providers);
  const passkeyProvider = getPasskeyProvider(providers);
  const endpointsFactory = new EndpointsFactory("admin");
  let oauthEndpoints = [];
  let passkeyEndpoints = [];
  if (Object.keys(oauthProviders).length > 0) {
    endpointsFactory.registerStrategy("oauth", new OAuthEndpointStrategy(oauthProviders));
    oauthEndpoints = endpointsFactory.createEndpoints("oauth", {
      sessionCallback: (oauthAccountInfo, scope, issuerName, request, clientOrigin) => session.createSession(oauthAccountInfo, scope, issuerName, request, clientOrigin)
    });
  }
  if (passkeyProvider) {
    endpointsFactory.registerStrategy("passkey", new PasskeyEndpointStrategy);
    passkeyEndpoints = endpointsFactory.createEndpoints("passkey");
  }
  config.endpoints = [
    ...config.endpoints ?? [],
    ...oauthEndpoints,
    ...passkeyEndpoints
  ];
  return config;
};
export {
  adminAuthPlugin
};
