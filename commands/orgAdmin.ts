import type {CommandDefinition} from "../types/types.ts";
import {getTokenForUser} from "../auth/getTokenForUser.ts";
import {createVehicle} from "./miscRequests.ts";
import {extractExecutionContext} from "../utils/misc.ts";

export const orgAdminCommands: Record<string, CommandDefinition> = {
    // -------------------------------- Create vehicle --------------------------------
    createVehicle: {
        description: 'Creates vehicle as an org admin',
        allowMultiple: true,

        execute: async (params: Record<string, string>) => {
            const {
                tenant,
                cleanParams,
            } = extractExecutionContext(params);

            const token = await getTokenForUser("orgAdmin", tenant);

            return await createVehicle(token, undefined, cleanParams);
        }
    },

}