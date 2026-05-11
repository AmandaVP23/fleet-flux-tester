import type {CommandDefinition, CommandParams} from "../types/types.ts";
import { getTokenForUser } from "../auth/getTokenForUser.ts";
import { extractExecutionContext } from "../utils/misc.ts";
import { getVehicles, getUsers, getAllVehicleBrands } from "./requests/list.ts";
import {createVehicle} from "./requests/create.ts";
import {getVehicleById} from "./requests/getById.ts";

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
        ----------------------- Get By ID ------------------------------
        ----------------------------------------------------------------
     */
    getVehicleById: {
        description: 'Get vehicle by id as OrgAdmin',
        allowMultiple: false,

        execute: async (params: CommandParams) => {
            const {
                tenant,
                context,
            } = extractExecutionContext(params);

            const token = await getTokenForUser("orgAdmin", tenant);

            getVehicleById(token, context.id);
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