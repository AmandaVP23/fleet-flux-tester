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

let filteredArgs = [...args];
let multiple = false;
if (args.includes('multiple')) {
    filteredArgs = args.filter(el => el !== 'multiple');
    multiple = true;
}

// parse --key=value args
const params: Record<string, string> = {};

for (const arg of filteredArgs) {
    const [k, v] = arg.replace(/^--/, "").split("=");
    if (k && v) params[k] = v;
}

let count: number | null = null;

if (params["count"]) {
    count = Number(params["count"]);
}

await runCommand(
    scope,
    action,
    multiple,
    count,
    params
);