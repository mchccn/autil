const remove = <T>(array: T[], ...indices: [number, ...number[]]) => array.filter((_, i) => !indices.includes(i));

export default remove;
