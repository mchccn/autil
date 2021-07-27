const mapify = <T>(array: T[], key: (value: T) => string) => new Map(Object.entries(array).map(([_, value]) => [key(value), value]));

export default mapify;
