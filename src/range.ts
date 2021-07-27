const range = (min: number, max?: number, step?: number) =>
    !max && !step
        ? new Array(min).fill(0).map((_, i) => i)
        : new Array(Math.ceil(((max ?? min) - min) / (step ?? 1))).fill(0).map((_, i) => min + i * (step ?? 1));

export default range;
