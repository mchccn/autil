import unique from "./unique";

const intersection = <T>(array: T[], ...values: [T[], ...T[][]]) => unique(array.concat(...values), true);

export default intersection;
