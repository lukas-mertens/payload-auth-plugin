// src/core/session/app.ts
import { UserNotFoundAPIError } from "../errors/apiErrors.js";
import {
  createSessionCookies,
  invalidateOAuthCookies
} from "../utils/cookies.js";
import { sessionResponse } from "../utils/session.js";
import { APP_COOKIE_SUFFIX } from "../../constants.js";

class AppSession {
  appName;
  collections;
  allowAutoSignUp;
  authenticationStrategy;
  secret;
  constructor(appName, collections, allowAutoSignUp, authenticationStrategy, secret) {
    this.appName = appName;
    this.collections = collections;
    this.allowAutoSignUp = allowAutoSignUp;
    this.authenticationStrategy = authenticationStrategy;
    this.secret = secret;
  }
  async oauthAccountMutations(userId, oauthAccountInfo, scope, issuerName, payload) {
    const data = {
      scope,
      name: oauthAccountInfo.name,
      picture: oauthAccountInfo.picture,
      issuerName
    };
    const accountRecords = await payload.find({
      collection: this.collections.accountsCollection,
      where: {
        sub: { equals: oauthAccountInfo.sub }
      }
    });
    if (accountRecords.docs && accountRecords.docs.length === 1) {
      return await payload.update({
        collection: this.collections.accountsCollection,
        id: accountRecords.docs[0].id,
        data
      });
    } else {
      data["sub"] = oauthAccountInfo.sub;
      data["user"] = userId;
      return await payload.create({
        collection: this.collections.accountsCollection,
        data
      });
    }
  }
  async oauthSessionCallback(oauthAccountInfo, scope, issuerName, request, clientOrigin) {
    const { payload } = request;
    const userRecords = await payload.find({
      collection: this.collections.usersCollection,
      where: {
        email: {
          equals: oauthAccountInfo.email
        }
      }
    });
    let userRecord;
    if (userRecords.docs.length === 1) {
      userRecord = userRecords.docs[0];
    } else if (this.allowAutoSignUp) {
      const userRecords2 = await payload.create({
        collection: this.collections.usersCollection,
        data: {
          email: oauthAccountInfo.email
        }
      });
      userRecord = userRecords2;
    } else {
      throw new UserNotFoundAPIError;
    }
    await this.oauthAccountMutations(userRecord["id"], oauthAccountInfo, scope, issuerName, payload);
    let cookies = [];
    if (this.authenticationStrategy === "Cookie") {
      cookies = [
        ...await createSessionCookies(`__${this.appName}-${APP_COOKIE_SUFFIX}`, this.secret, {
          id: userRecord["id"],
          email: oauthAccountInfo.email,
          collection: this.collections.usersCollection
        })
      ];
      cookies = invalidateOAuthCookies(cookies);
    }
    return sessionResponse(cookies, clientOrigin);
  }
  async passwordSessionCallback(user) {
    let cookies = [];
    if (this.authenticationStrategy === "Cookie") {
      cookies = [
        ...await createSessionCookies(`__${this.appName}-${APP_COOKIE_SUFFIX}`, this.secret, {
          id: user.id,
          email: user.email,
          collection: this.collections.usersCollection
        })
      ];
      cookies = invalidateOAuthCookies(cookies);
    }
    return sessionResponse(cookies);
  }
}
export {
  AppSession
};
