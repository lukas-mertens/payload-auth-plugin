import { CollectionConfig, Field } from "payload";
/**
 * A higher order function that takes the collection config and a Users collection slug for the arguments
 * @param incomingCollection
 * @param userCollectionSlug
 * @returns {CollectionConfig}
 */
export declare const withAdminAccountCollection: (incomingCollection: Omit<CollectionConfig, "fields"> & {
    fields?: Field[] | undefined;
}, usersCollectionSlug: string) => CollectionConfig;
//# sourceMappingURL=admin.d.ts.map