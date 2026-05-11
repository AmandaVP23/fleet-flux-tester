import { apiRequest } from "../utils/apiRequest.ts";
import { getRandomFromList } from "../utils/random.ts";
import { getNextVehicleModelForBrand } from "../utils/vehicleModelNameProvider.ts";
import { faker } from "@faker-js/faker";
import { generatePlate } from "../utils/misc.ts";
import { USER_ROLE, VEHICLE_CATEGORY, VEHICLE_FUEL_TYPE, VEHICLE_OWNERSHIP, VEHICLE_TYPE } from "../utils/constants.ts";
import type {CommandParams} from "../types/types.ts";
import {logData} from "../utils/log.ts";

export const getAllVehicleBrands = async (token: string, params?: CommandParams): Promise<any[]> => {
    try {
        const res = await apiRequest('/vehicle-brands', {
            token,
        });

        const resData = await res.json();
        if (!res.ok) {
            console.error("Could not get vehicle brands ");
            console.log(resData);
            return [];
        }

        return resData as any[];
    } catch (error) {
        // @ts-ignore
        console.error(error.message);
        return [];
    }
};

export const getUsers = async (token: string, params?: CommandParams): Promise<any[]> => {
    try {
        const res = await apiRequest('/users', {
            token,
        }, params);

        const resData = await res.json();
        if (!res.ok) {
            console.error("Could not get users");
            console.log(resData);
            return [];
        }

        console.log('-------> Users:');
        logData(resData);
        return resData as any[];
    } catch (error) {
        // @ts-ignore
        console.error(error.message);
        return [];
    }
};

export const getOrganizationById = async (token: string, orgId: string ) => {
    try {
        const res = await apiRequest(`/organizations/${orgId}`, {
            token,
        });

        const resData = await res.json();
        if (!res.ok) {
            console.error("Could not get organization by id", orgId);
            console.log(resData);
            return;
        }

        return resData;
    } catch (e) {
        // @ts-ignore
        console.log(e.message);
    }
}

export const createVehicle = async (token: string, organizationId?: string | number, params: CommandParams = {}) => {
    try {
        let brandId = params['brandId'];
        let model = params['model'];
        if (!brandId) {
            const list = await getAllVehicleBrands(token);
            const randomBrand = getRandomFromList(list);

            if (!randomBrand) {
                throw new Error('Not possible to get random brand');
            }

            model = getNextVehicleModelForBrand(randomBrand.name);
            brandId = randomBrand.id;
        }

        const payload = {
            organizationId,
            brandId,
            model,
            plateNumber: generatePlate(),
            vin: faker.vehicle.vin(),
            yearOfManufacture: faker.number.int({ min: 2000, max: new Date().getFullYear() - 1 }),
            variant: faker.datatype.boolean() ? faker.word.words({ count: 1 }) : null,
            status: 'ACTIVE',
            category: faker.helpers.arrayElement(VEHICLE_CATEGORY),
            type: faker.helpers.arrayElement(VEHICLE_TYPE),
            fuelType: faker.helpers.arrayElement(VEHICLE_FUEL_TYPE),
            fuelCapacityInLiters: faker.number.float({ min: 10, max: 150, fractionDigits: 1 }),
            avgConsumptionPer100Km: faker.number.float({ min: 3, max: 20, fractionDigits: 1 }),
            lastServiceDate: faker.date.past({ years: 2 }),
            insuranceExpiryDate: faker.date.future({ years: 1 }),
            inspectionDueDate: faker.date.future({ years: 1 }),
            insurancePolicyNumber: faker.string.alphanumeric({ length: { min: 6, max: 12 } }).toUpperCase(),
            ownershipType: faker.helpers.arrayElement(VEHICLE_OWNERSHIP),
            ...params,
        };

        const res = await apiRequest('/vehicles', {
            token,
            method: 'POST',
            body: payload,
        });

        const resData = await res.json();
        if (!res.ok) {
            console.error("Could not create vehicle with: ", payload);
            console.log(resData);
            return;
        }

        console.log("--- Created vehicle ---");
        logData(resData);
    } catch (error) {
        // @ts-ignore
        console.error(error.message);
    }
};

export const createUser = async (token: string, organizationId?: string | number, params: CommandParams  = {}) => {
    try {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = `${firstName}.${lastName}@${faker.internet.domainWord()}.com`;
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email,
            role: faker.helpers.arrayElement(USER_ROLE),
            organizationId,
            ...params,
        };

        const res = await apiRequest('/users', {
            token,
            method: 'POST',
            body: payload,
        });

        const resData = await res.json();
        if (!res.ok) {
            console.error("Could not create user with: ", payload);
            console.log(resData);
            return;
        }

        console.log("--- Created user ---");
        logData(resData);
    } catch (error) {
        // @ts-ignore
        console.error(error.message);
    }
}

export const getVehicles = async (token: string, params?: CommandParams): Promise<any[]> => {
    try {
        const res = await apiRequest('/vehicles', {
            token,
        }, params);

        const resData = await res.json();
        if (!res.ok) {
            console.error("Could not get vehicles");
            logData(resData);
            return [];
        }

        console.log('-------> Vehicles:');
        logData(resData);

        return resData as any[];
    } catch (error) {
        // @ts-ignore
        console.error(error.message);
        return [];
    }
};