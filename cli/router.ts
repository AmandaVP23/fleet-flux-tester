// src/cli/router.ts

import {adminCommands} from "../commands/superAdmin.ts";

const registry: Record<string, Record<string, Function>> = {
    superAdmin: adminCommands,
    // tenant: tenantCommands
};

export async function runCommand(
    scope: string,
    action: string,
    params: Record<string, string>
) {
    const group = registry[scope];

    if (!group) {
        throw new Error(`Unknown scope: ${scope}`);
    }

    const fn = group[action];

    if (!fn) {
        throw new Error(`Unknown action: ${scope}.${action}`);
    }

    await fn(params);
}