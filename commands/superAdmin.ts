import { getTokenForUser } from '../auth/getTokenForUser.ts';
import { apiRequest } from '../utils/apiRequest.ts';
import { fakerEN_GB as faker } from '@faker-js/faker';
import { getNextOrganizationName } from "../utils/organizationNameProvider.ts";
import type {CommandDefinition, CommandParams} from "../types/types.ts";
import {getNextVehicleBrandName} from "../utils/vehicleBrandNameProvider.ts";
import {createUser, createVehicle, getAllVehicleBrands, getUsers, getVehicles} from "./miscRequests.ts";
import {extractExecutionContext, generateEmailWithoutDomain} from "../utils/misc.ts";
import {logData} from "../utils/log.ts";

export const superAdminCommands: Record<string, CommandDefinition> = {
    getToken: {
        description: 'Get token as superAdmin',
        allowMultiple: false,
        execute: async () => {
            console.log(await getTokenForUser("superadmin"));
        },
    },

    // -------------------------------- Create Organization --------------------------------
    createOrganization: {
        description: 'Creates organization',
        allowMultiple: true,

        execute: async (params) => {
            const token = await getTokenForUser("superadmin");

            const name = getNextOrganizationName();
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const emailDomain = generateEmailWithoutDomain(name);

            const payload = {
                name,
                adminFirstName: firstName,
                adminLastName: lastName,
                adminEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}.com`,
                ...params,
            };

            try {
                const res = await apiRequest('/organizations', {
                    token,
                    method: 'POST',
                    body: payload,
                });

                const resData = await res.json();
                if (!res.ok) {
                    console.error("Could not create organization with: ", payload);
                    console.log(resData);
                    return;
                }

                console.log("--- Created organization ---");
                logData(resData);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        }
    },

    // -------------------------------- Create User --------------------------------
    createUser: {
        description: 'Creates user',
        allowMultiple: true,

        execute: async (params) => {
            if (params['organizationId']) {
                new Error('For the vehicle creation set the organizationId');
            }

            const organizationId= params['organizationId'];

            const token = await getTokenForUser("superadmin");

            await createUser(token, organizationId as unknown as number, params);
        }
    },

    // -------------------------------- Create vehicle brand --------------------------------
    createVehicleBrand: {
        description: 'Creates vehicle brand',
        allowMultiple: true,
        execute: async (params) => {
            const token = await getTokenForUser("superadmin");

            try {
                const brandName = getNextVehicleBrandName();

                const payload = {
                    name: brandName,
                    ...params,
                };

                const res = await apiRequest('/vehicle-brands', {
                    token,
                    method: 'POST',
                    body: payload,
                });

                const resData = await res.json();
                if (!res.ok) {
                    console.error("Could not create vehicle brand with: ", payload);
                    console.log(resData);
                    return;
                }

                console.log("--- Created vehicle brand ---");
                logData(resData);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        },
    },

    // -------------------------------- Create vehicle --------------------------------
    createVehicle: {
        description: 'Creates vehicle',
        allowMultiple: true,

        execute: async (params) => {
            const organizationId= Number(params['organizationId']);

            if (isNaN(organizationId) || !organizationId) {
                new Error('organizationId should be set and be a number for the vehicle creation');
            }

            const token = await getTokenForUser("superadmin");

            return await createVehicle(token, organizationId, params);
        }
    },

    /*
        ----------------------------------------------------------------
        --------------------- Lists requests ---------------------------
        ----------------------------------------------------------------
     */
    listOrganizations: {
        description: 'List organizations as SuperAdmin',
        allowMultiple: false,

        execute: async (params: CommandParams) => {
            const token = await getTokenForUser("superadmin");

            try {
                const res = await apiRequest('/organizations', {
                    token,
                }, params);

                const resData = await res.json();
                if (!res.ok) {
                    console.error("Could not get organizations");
                    console.log(resData);
                    return;
                }

                console.log('--------> Organizations:')
                logData(resData);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
                return [];
            }
        }
    },

    listUsers: {
        description: 'List users as SuperAdmin',
        allowMultiple: false,

        execute: async (params: CommandParams) => {
            const token = await getTokenForUser("superadmin");

            return await getUsers(token, params);
        }
    },

    listVehicleBrands: {
        description: 'List vehicle brands as SuperAdmin',
        allowMultiple: false,

        execute: async (params: CommandParams) => {
            const token = await getTokenForUser("superadmin");

            return await getAllVehicleBrands(token, params);
        }
    },

    listVehicles: {
        description: 'List vehicles as SuperAdmin',
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
};