import {apiRequest} from "../../utils/apiRequest.ts";
import {logData} from "../../utils/log.ts";

export const getVehicleById = async (token: string, id?: any) => {
    if (!id) {
        throw new Error("id must be set for getVehicleById (--id)");
    }

    try {
        const res = await apiRequest(`/vehicles/${id}`, {
            token,
        });

        const resData = await res.json();
        if (!res.ok) {
            console.error("Could not get vehicle");
            logData(resData);
            return [];
        }

        console.log(`-------> Vehicle ${id}:`);
        logData(resData);
    } catch (error) {
        // @ts-ignore
        console.error(error.message);
        return [];
    }
};
