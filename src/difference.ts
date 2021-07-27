const difference = <T>(array: T[], ...values: [T[], ...T[][]]): T[] => {
    if (values.length === 1) return array.filter((x) => !values[0].includes(x));

    return difference(
        array.filter((x) => !values[0].includes(x)),
        ...(values.slice(1) as [T[], ...T[][]])
    );
};

export default difference;
