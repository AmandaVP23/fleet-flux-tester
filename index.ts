import { runCommand } from "./cli/router.ts";

const [, , scope, action, ...args] = process.argv;

if (!scope || !action) {
    console.error("Usage: cli <scope> <action> [--key=value]");
    process.exit(1);
}

// parse --key=value args
const params: Record<string, string> = {};
for (const arg of args) {
    const [k, v] = arg.replace(/^--/, "").split("=");
    if (k && v) params[k] = v;
}

await runCommand(scope, action, params);