import type {CommandParams} from "../types/types.ts";

export const multipleRuns = (
    count: number,
    fn: Function,
    params: CommandParams,
) => {
    return Array.from({ length: count }).reduce(
        async (prev) => {
            await prev;
            return fn(params);
        },
        Promise.resolve()
    );
};

// return Promise.all(
//     Array.from({ length: count }, () => fn(params))
// );