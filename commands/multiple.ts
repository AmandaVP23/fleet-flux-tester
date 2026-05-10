export const multipleRuns = (
    count: number,
    fn: Function,
    params: Record<string, string>,
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