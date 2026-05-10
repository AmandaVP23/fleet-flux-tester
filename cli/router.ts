// src/cli/router.ts

import {adminCommands} from "../commands/superAdmin.ts";
import {multipleRuns} from "../commands/multiple.ts";
import type {CommandDefinition} from "../types/types.ts";

export const registry: Record<string, Record<string, CommandDefinition>> = {
    superAdmin: adminCommands,
    // tenant: tenantCommands
};

function capitalizeFirstLetter(value: string) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

export async function runCommand(
    scope: string,
    action: string,
    multiple: boolean,
    count: number | null,
    params: Record<string, string>
) {
    const group = registry[scope];

    if (!group) {
        throw new Error(`Unknown scope: ${scope}`);
    }

    if (multiple && !count) {
        throw new Error('If multiple is set than count should also be set');
    }

    const command = group[action];

    if (!command) {
        throw new Error(`Unknown action: ${scope}.${action}`);
    }

    // NEW VALIDATION
    if (multiple && !command.allowMultiple) {
        throw new Error(
            `Command '${scope}.${action}' does not allow multiple execution`
        );
    }

    if (multiple && count) {
        // await fn(count, params);
        await multipleRuns(count, command.execute, params);
    } else {
        await command.execute(params);
    }
}