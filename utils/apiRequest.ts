import { API_URL } from './constants.ts';
import {buildUrl} from "./params.ts";
import type {CommandParams} from "../types/types.ts";

export async function apiRequest(
    path: string,
    options: {
        token: string;
        method?: string;
        body?: any;
    },
    params: CommandParams = {},
) {
    const url = buildUrl(`${API_URL}${path}`, params);
    console.log('URL', url);

    return fetch(url, {
        method: options.method ?? "GET",
        headers: {
            Authorization: `Bearer ${options.token}`,
            'Content-Type': 'application/json'
        },
        body: options.body ? JSON.stringify(options.body) : undefined
    });
}
