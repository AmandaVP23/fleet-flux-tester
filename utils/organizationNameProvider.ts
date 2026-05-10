import { faker } from "@faker-js/faker";
import fs from "fs";

const ALL_NAMES_PATH = "./data/organizationNames.json";
const USED_NAMES_PATH = "./data/usedOrganizationNames.json";

function readJson<T>(path: string): T {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
}

function writeJson(path: string, data: unknown) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

export function getNextOrganizationName(): string {
    const allNames = readJson<string[]>(ALL_NAMES_PATH);
    const usedNames = readJson<string[]>(USED_NAMES_PATH);

    const available = allNames.filter(
        name => !usedNames.includes(name)
    );

    // use predefined first
    if (available[0]) {
        const selected = available[0];

        usedNames.push(selected);
        writeJson(USED_NAMES_PATH, usedNames);

        return selected;
    }

    // fallback to faker
    return faker.company.name();
}