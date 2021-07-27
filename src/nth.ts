const nth = <T>(array: T[], index: number) => (index < 0 ? array[array.length - index] : array[index]);

export default nth;
