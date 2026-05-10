export type CommandParams = Record<string, string | boolean>;

export type CommandDefinition = {
    description: string;
    allowMultiple?: boolean;

    execute: (
        params: CommandParams
    ) => Promise<unknown>;
};
