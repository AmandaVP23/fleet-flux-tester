import {getTokenForUser} from "../auth/getTokenForUser.ts";
import {apiRequest} from "../utils/apiRequest.ts";

export const adminCommands = {
    createOrganization:  async (params: Record<string, string>) => {
        const token = await getTokenForUser("superadmin");

        const payload = {
            name: 'Hey123',
            adminFirstName: 'John',
            adminLastName: 'Doe',
            adminEmail: 'john.doe@hey123.com'
        };

        try {
            const res = await apiRequest('/organizations', {
                token,
                method: 'POST',
                body: payload,
            });

            if (!res.ok) {
                console.error("Could not create organization with: ", payload);
                console.log(res.body);
            }

            console.log("--- Created organization ---");
            console.log(await res.json());
        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
    },

    createVehicle: async (params: Record<string, string>) => {
        const token = await getTokenForUser("superadmin");

        const payload = {
            type: params.type,
            count: Number(params.count ?? 1)
        };

        const res = await fetch("http://localhost:8080/api/vehicles", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        console.log(await res.json());
    },
};