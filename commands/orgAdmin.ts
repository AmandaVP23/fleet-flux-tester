import type {CommandDefinition, CommandParams} from "../types/types.ts";
import {getTokenForUser} from "../auth/getTokenForUser.ts";
import {createVehicle, getAllVehicleBrands, getUsers, getVehicles} from "./miscRequests.ts";
import {extractExecutionContext} from "../utils/misc.ts";

export const orgAdminCommands: Record<string, CommandDefinition> = {
    // -------------------------------- Create vehicle --------------------------------
    createVehicle: {
        description: 'Creates vehicle as an org admin',
        allowMultiple: true,

        execute: async (params: CommandParams) => {
            const {
                tenant,
                cleanParams,
            } = extractExecutionContext(params);

            const token = await getTokenForUser("orgAdmin", tenant);

            return await createVehicle(token, undefined, cleanParams);
        }
    },

    /*
        ----------------------------------------------------------------
        --------------------- Lists requests ---------------------------
        ----------------------------------------------------------------
     */
    listUsers: {
        description: 'List users as OrgAdmin',
        allowMultiple: false,

        execute: async (params: CommandParams) => {
            const {
                tenant,
                cleanParams,
            } = extractExecutionContext(params);

            const token = await getTokenForUser("orgAdmin", tenant);

            return await getUsers(token, cleanParams);
        }
    },

    listVehicleBrands: {
        description: 'List vehicle brands as OrgAdmin',
        allowMultiple: false,

        execute: async (params: CommandParams) => {
            const token = await getTokenForUser("orgAdmin");

            return await getAllVehicleBrands(token, params);
        }
    },

    listVehicles: {
        description: 'List vehicles as OrgAdmin',
        allowMultiple: false,

        execute: async (params: CommandParams) => {
            const {
                tenant,
                cleanParams,
            } = extractExecutionContext(params);

            const token = await getTokenForUser("orgAdmin", tenant);

            return await getVehicles(token, cleanParams);
        }
    },

}