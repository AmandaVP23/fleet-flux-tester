// src/cli/router.ts

import {superAdminCommands} from "../commands/superAdmin.ts";
import {multipleRuns} from "../commands/multiple.ts";
import type {CommandDefinition} from "../types/types.ts";
import {extractExecutionContext} from "../utils/misc.ts";
import {orgAdminCommands} from "../commands/orgAdmin.ts";

export const registry: Record<string, Record<string, CommandDefinition>> = {
    superAdmin: superAdminCommands,
    orgAdmin: orgAdminCommands,
};

export async function runCommand(
    scope: string,
    action: string,
    params: Record<string, string | boolean>
) {
    const group = registry[scope];

    const {
        count,
        multiple,
    } = extractExecutionContext(params);

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

    console.log(params);

    if (multiple && count) {
        // await fn(count, params);
        await multipleRuns(count, command.execute, params);
    } else {
        await command.execute(params);
    }
}