import { runCommand } from "./router.ts";
import { showHelp } from "./showHelp.ts";

const [, , scope, action, ...args] = process.argv;

// -------------------------
// HELP HANDLING (NEW)
// -------------------------
if (
    scope === "help" ||
    scope === "--help" ||
    scope === "-h"
) {
    showHelp();
    process.exit(0);
}

if (!scope || !action) {
    console.error("Usage: <scope> <action> [--key=value]");
    console.log("Run 'help' to see available commands.");
    process.exit(1);
}

// parse --key=value args
const params: Record<string, string | boolean> = {};

for (const arg of args) {
    const [k, v] = arg.replace(/^--/, "").split("=");
    if (k) {
        params[k] = v || true;
    }
}

await runCommand(
    scope,
    action,
    params
);