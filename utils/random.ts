export const getRandomFromList = (list: unknown[]): any => {
    if (list.length === 0) return undefined;

    const index = Math.floor(Math.random() * list.length);
    return list[index];
}
