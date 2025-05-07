import type { Plugin } from "payload";
import type { ProvidersConfig } from "../types.js";
interface PluginOptions {
    enabled?: boolean;
    providers: ProvidersConfig[];
    accountsCollectionSlug: string;
    allowSignUp?: boolean;
}
export declare const adminAuthPlugin: (pluginOptions: PluginOptions) => Plugin;
export {};
//# sourceMappingURL=admin.d.ts.map