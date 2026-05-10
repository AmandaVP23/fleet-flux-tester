import {faker} from "@faker-js/faker";

export const generatePlate = () => {
    let firstPart = faker.string.alpha({ length: 2 }).toUpperCase();
    let middlePart = faker.string.numeric({ length: 2 });
    let lastPart = faker.string.alpha({ length: 2 }).toUpperCase();

    if (faker.datatype.boolean()) {
        firstPart = faker.string.numeric({ length: 2 });
        middlePart = faker.string.alpha({ length: 2 }).toUpperCase();
        lastPart = faker.string.numeric({ length: 2 });
    }

    return `${firstPart}-${middlePart}-${lastPart}`;
};

export const getDomainName = (value: string) => {
    return value
        .replace(/\s+/g, "")        // remove spaces
        .replace(/[^a-z0-9]/gi, "") // remove special characters
        .toLowerCase();
}
