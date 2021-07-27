const aggregate = <T, K extends PropertyKey>(array: T[], key: (value: T) => K) =>
    array.reduce((acc, value) => acc.set(key(value), [...(acc.get(key(value)) ?? []), value]), new Map<K, T[]>());

export default aggregate;
