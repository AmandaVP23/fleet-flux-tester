import {registry} from "./router.ts";

export function showHelp() {
    console.log('\nAvailable commands:\n');

    for (const [scopeName, commands] of Object.entries(registry)) {
        console.log(`${scopeName}`);

        for (const [commandName, command] of Object.entries(commands)) {
            console.log(
                `  - ${commandName}` +
                (command.allowMultiple
                    ? ' [multiple]'
                    : '')
            );

            console.log(
                `      ${command.description}`
            );
        }

        console.log('Use --tenant to specify tenant');

        console.log('');
    }
}