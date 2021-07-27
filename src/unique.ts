import equal from "./utils/equal";

const unique = <T>(array: T[], deep?: boolean) => {
    if (!deep) return [...new Set(array)];

    const output = [] as T[];

    array.forEach((b) => {
        if (output.some((a) => equal(a, b))) return;

        return output.push(b);
    });

    return output;
};

export default unique;
