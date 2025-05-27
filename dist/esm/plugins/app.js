// src/plugins/app.ts
import {
  InvalidServerURL,
  MissingEmailAdapter
} from "../core/errors/consoleErrors.js";
import {
  getPasswordProvider,
  getOAuthProviders,
  getPasskeyProvider
} from "../providers/utils.js";
import {
  PasswordAuthEndpointStrategy,
  EndpointsFactory,
  OAuthEndpointStrategy,
  PasskeyEndpointStrategy,
  SessionEndpointStrategy
} from "../core/endpoints.js";
import { AppSession } from "../core/session/app.js";
import { formatSlug } from "../core/utils/slug.js";
import { preflightCollectionCheck } from "../core/preflights/collections.js";
var appAuthPlugin = (pluginOptions) => (incomingConfig) => {
  const config = { ...incomingConfig };
  if (pluginOptions.enabled === false) {
    return config;
  }
  if (!config.serverURL) {
    throw new InvalidServerURL;
  }
  const {
    usersCollectionSlug,
    accountsCollectionSlug,
    providers,
    allowAutoSignUp,
    authenticationStrategy,
    secret
  } = pluginOptions;
  preflightCollectionCheck([usersCollectionSlug, accountsCollectionSlug], config.collections);
  const name = formatSlug(pluginOptions.name);
  const oauthProviders = getOAuthProviders(providers);
  const passkeyProvider = getPasskeyProvider(providers);
  const passwordProvider = getPasswordProvider(providers);
  const session = new AppSession(name, {
    usersCollection: usersCollectionSlug,
    accountsCollection: accountsCollectionSlug
  }, allowAutoSignUp ?? false, authenticationStrategy ?? "Cookie", secret);
  const endpointsFactory = new EndpointsFactory(name);
  let oauthEndpoints = [];
  let passkeyEndpoints = [];
  let passwordEndpoints = [];
  if (Object.keys(oauthProviders).length > 0) {
    endpointsFactory.registerStrategy("oauth", new OAuthEndpointStrategy(oauthProviders));
    oauthEndpoints = endpointsFactory.createEndpoints("oauth", {
      sessionCallback: (oauthAccountInfo, scope, issuerName, request, clientOrigin) => session.oauthSessionCallback(oauthAccountInfo, scope, issuerName, request, clientOrigin)
    });
  }
  if (passkeyProvider) {
    endpointsFactory.registerStrategy("passkey", new PasskeyEndpointStrategy);
    passkeyEndpoints = endpointsFactory.createEndpoints("passkey");
  }
  if (passwordProvider) {
    if (!!!config.email) {
      throw new MissingEmailAdapter;
    }
    endpointsFactory.registerStrategy("password", new PasswordAuthEndpointStrategy({ usersCollectionSlug }, secret));
    passwordEndpoints = endpointsFactory.createEndpoints("password", {
      sessionCallback: (user) => session.passwordSessionCallback(user)
    });
  }
  endpointsFactory.registerStrategy("session", new SessionEndpointStrategy(secret, { usersCollectionSlug }));
  const sessionEndpoints = endpointsFactory.createEndpoints("session");
  config.endpoints = [
    ...config.endpoints ?? [],
    ...oauthEndpoints,
    ...passkeyEndpoints,
    ...passwordEndpoints,
    ...sessionEndpoints
  ];
  return config;
};
export {
  appAuthPlugin
};
