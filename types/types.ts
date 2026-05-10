export type CommandDefinition = {
    description: string;
    allowMultiple?: boolean;

    execute: (
        params: Record<string, string>
    ) => Promise<unknown>;
};
