import type {CommandParams} from "../../types/types.ts";
import {apiRequest} from "../../utils/apiRequest.ts";
import {logData} from "../../utils/log.ts";

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
