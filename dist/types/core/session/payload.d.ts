import { PayloadRequest } from "payload";
import { AccountInfo } from "../../types.js";
type Collections = {
    accountsCollectionSlug: string;
    usersCollectionSlug: string;
};
export declare class PayloadSession {
    #private;
    constructor(collections: Collections, allowSignUp?: boolean);
    createSession(accountInfo: AccountInfo, scope: string, issuerName: string, request: PayloadRequest, clientOrigin: string): Promise<Response>;
}
export {};
//# sourceMappingURL=payload.d.ts.map