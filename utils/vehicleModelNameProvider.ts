import { faker } from "@faker-js/faker";
import fs from "fs";

const ALL_NAMES_PATH = "./data/vehicleModelsByBrandName.json";
const USED_NAMES_PATH = "./data/usedVehicleModelsByBrandName.json";

function readJson<T>(path: string): T {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
}

function writeJson(path: string, data: unknown) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

export function getNextVehicleModelForBrand(brand: string): string {
    const allModels = readJson<Record<string, string[]>>(ALL_NAMES_PATH);
    const usedModels = readJson<Record<string, string[]>>(USED_NAMES_PATH);

    const brandModels = allModels[brand];

    if (!brandModels) {
        throw new Error(`Unknown brand: ${brand}`);
    }

    const usedForBrand = usedModels[brand] ?? [];

    const available = brandModels.filter(
        model => !usedForBrand.includes(model)
    );

    if (!available[0]) {
        return `${brand} ${faker.animal.type()}`
    }

    const selected = available[0];

    // persist update
    usedModels[brand] = [...usedForBrand, selected];
    writeJson(USED_NAMES_PATH, usedModels);

    return selected;
}