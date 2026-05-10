type Params = Record<string, string | number | boolean | undefined | null>;

export function buildUrl(baseUrl: string, params: Params): string {
    const url = new URL(baseUrl);

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        url.searchParams.append(key, String(value));
    });

    return url.toString();
}
