import { PayloadRequest } from "payload";
import { AccountInfo, AuthenticationStrategy } from "../../types.js";
export declare class AppSession {
    private appName;
    private collections;
    private allowAutoSignUp;
    private authenticationStrategy;
    private secret;
    constructor(appName: string, collections: {
        usersCollection: string;
        accountsCollection: string;
    }, allowAutoSignUp: boolean, authenticationStrategy: AuthenticationStrategy, secret: string);
    private oauthAccountMutations;
    oauthSessionCallback(oauthAccountInfo: AccountInfo, scope: string, issuerName: string, request: PayloadRequest, clientOrigin: string): Promise<Response>;
    passwordSessionCallback(user: Pick<AccountInfo, "email"> & {
        id: string;
    }): Promise<Response>;
}
//# sourceMappingURL=app.d.ts.map