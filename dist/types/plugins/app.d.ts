/**
 * The App plugin is used for authenticating users in the frontent app of the Payload CMS application.
 * It support magic link, password, OAuth, and Passkey based authentications.
 *
 * On top of it, to add additional security it also support 2FA using OTP, and TOTP.
 *
 * The set up is very lean and flexible to tailor the auth process in a specific way.
 *
 * ```ts
 * import {appAuthPlugin} from "payload-auth-plugin";
 *
 * // TODO: Need complete implementation
 *
 * ```
 * @packageDocumentation
 */
import { Plugin } from "payload";
import { AuthenticationStrategy, PasswordProviderConfig, OAuthProviderConfig, PasskeyProviderConfig } from "../types.js";
/**
 * The App plugin to set up authentication to the intengrated frontend of Payload CMS.
 *
 * Add the plugin to your Payload project plugins.
 *
 */
interface PluginOptions {
    /**
     * Enable or disable plugin
     *
     * @default true
     *
     */
    enabled?: boolean | undefined;
    /**
     * Unique name for your frontend app.
     *
     * This name will be used to created endpoints, tokens, and etc.
     */
    name: string;
    /**
     * Auth providers supported by the plugin
     *
     */
    providers: (OAuthProviderConfig | PasskeyProviderConfig | PasswordProviderConfig)[];
    /**
     * @description
     * App users collection slug.
     *
     * This collection will be used to store all the app user records.
     *
     */
    usersCollectionSlug: string;
    /**
     * App user accounts collection slug.
     *
     * This collection will be used to store all the app user account records.
     * Multiple accounts can belong to one user
     *
     */
    accountsCollectionSlug: string;
    /**
     * Allow auto signup if user doesn't have an account.
     *
     * @default false
     *
     */
    allowAutoSignUp?: boolean | undefined;
    /**
     * Authentication strategies can be either JWT or Cookie based
     *
     * @default Cookie
     *
     */
    authenticationStrategy?: AuthenticationStrategy;
    /**
     * Secret to use for JWT signing and decryption
     */
    secret: string;
}
/**
 * App plugin funtion.
 *
 * @param {PluginOptions} pluginOptions
 * @returns {Plugin}
 */
export declare const appAuthPlugin: (pluginOptions: PluginOptions) => Plugin;
export {};
//# sourceMappingURL=app.d.ts.map