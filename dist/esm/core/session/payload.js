// src/core/session/payload.ts
import { hashCode } from "../utils/hash.js";
import {
  createSessionCookies,
  invalidateOAuthCookies
} from "../utils/cookies.js";
import { sessionResponse } from "../utils/session.js";
import { UserNotFoundAPIError } from "../errors/apiErrors.js";

class PayloadSession {
  #collections;
  #allowSignUp;
  constructor(collections, allowSignUp) {
    this.#collections = collections;
    this.#allowSignUp = !!allowSignUp;
  }
  async#upsertAccount(accountInfo, scope, issuerName, payload) {
    let userID;
    const userQueryResults = await payload.find({
      collection: this.#collections.usersCollectionSlug,
      where: {
        email: {
          equals: accountInfo.email
        }
      }
    });
    if (userQueryResults.docs.length === 0) {
      if (!this.#allowSignUp) {
        return new UserNotFoundAPIError;
      }
      const newUser = await payload.create({
        collection: this.#collections.usersCollectionSlug,
        data: {
          email: accountInfo.email,
          emailVerified: true,
          password: hashCode(accountInfo.email + payload.secret).toString()
        }
      });
      userID = newUser.id;
    } else {
      userID = userQueryResults.docs[0].id;
    }
    const accounts = await payload.find({
      collection: this.#collections.accountsCollectionSlug,
      where: {
        sub: { equals: accountInfo.sub }
      }
    });
    const data = {
      scope,
      name: accountInfo.name,
      picture: accountInfo.picture
    };
    if (issuerName === "Passkey" && accountInfo.passKey) {
      data["passkey"] = {
        ...accountInfo.passKey
      };
    }
    if (accounts.docs.length > 0) {
      data["sub"] = accountInfo.sub;
      data["issuerName"] = issuerName;
      data["user"] = userID;
      await payload.update({
        collection: this.#collections.accountsCollectionSlug,
        where: {
          id: {
            equals: accounts.docs[0].id
          }
        },
        data
      });
    } else {
      data["sub"] = accountInfo.sub;
      data["issuerName"] = issuerName;
      data["user"] = userID;
      await payload.create({
        collection: this.#collections.accountsCollectionSlug,
        data
      });
    }
    return userID;
  }
  async createSession(accountInfo, scope, issuerName, request, clientOrigin) {
    const { payload } = request;
    const userID = await this.#upsertAccount(accountInfo, scope, issuerName, payload);
    const fieldsToSign = {
      id: userID,
      email: accountInfo.email,
      collection: this.#collections.usersCollectionSlug
    };
    let cookies = [];
    cookies = [
      ...await createSessionCookies(`${payload.config.cookiePrefix}-token`, payload.secret, fieldsToSign)
    ];
    cookies = invalidateOAuthCookies(cookies);
    return sessionResponse(cookies, clientOrigin);
  }
}
export {
  PayloadSession
};
