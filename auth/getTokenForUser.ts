import credentials from "./credentials.json";
import { loginKeycloak } from "./login";

export async function getTokenForUser(
    role: keyof typeof credentials,
    tenant?: string,
) {
    const roleCredentials = credentials[role];

    if (!roleCredentials) {
        throw new Error(`Unknown role: ${role}`);
    }

    if (tenant) {
        // @ts-ignore
        const cred = roleCredentials[tenant];

        if (!cred) {
            throw new Error(
                `No credentials found for role '${role}' and tenant '${tenant}'`
            );
        }

        return loginKeycloak(cred);
    }

    const cred = role === "superadmin" ? roleCredentials : Object.values(roleCredentials)[0];
    if (!cred) {
        throw new Error(
            `No credentials configured for role '${role}'`
        );
    }

    return loginKeycloak(cred);
}