import { API_URL } from './constants.ts';

export async function apiRequest(
    path: string,
    options: {
        token: string;
        method?: string;
        body?: any;
    }
) {
    return fetch(`${API_URL}${path}`, {
        method: options.method ?? "GET",
        headers: {
            Authorization: `Bearer ${options.token}`,
            'Content-Type': 'application/json'
        },
        body: options.body ? JSON.stringify(options.body) : undefined
    });
}
