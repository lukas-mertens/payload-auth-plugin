import { PasswordSignupPayload } from "./password.js";
interface BaseOptions {
    name: string;
}
export declare const appSignup: (options: BaseOptions) => {
    password: (paylaod: PasswordSignupPayload) => Promise<import("../types.js").AuthPluginOutput>;
};
export {};
//# sourceMappingURL=signup.d.ts.map