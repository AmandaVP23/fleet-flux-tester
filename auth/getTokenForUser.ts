import credentials from "./credentials.json";
import { loginKeycloak } from "./login";

export async function getTokenForUser(
    key: keyof typeof credentials
) {
    const cred = credentials[key];
    return loginKeycloak(cred);
}