import clone from "./utils/clone";

const shuffle = <T>(array: T[], copy?: "deep" | "shallow" | boolean) => {
    const target = copy ? (copy === "deep" ? clone(array) : [...array]) : array;

    for (let i = target.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [target[i], target[j]] = [target[j], target[i]];
    }

    return target;
};

export default shuffle;
