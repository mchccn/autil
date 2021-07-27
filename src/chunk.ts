const chunk = <T>(array: T[], size: number) => array.flatMap((_, i) => (i % size ? [] : [array.slice(i, Math.floor(i / size) * size + size)]));

export default chunk;
