export default function clone<T>(object: T): T {
    if (typeof object == "function") return object;

    const result = (Array.isArray(object) ? [] : {}) as any;

    Object.entries(object).forEach(([key, value]) => {
        if (Array.isArray(value)) result[key] = clone(value);
        else if (value instanceof Date) result[key] = new Date(value.getTime());
        else if (value instanceof RegExp) result[key] = RegExp(value.source, value.flags);
        else if (typeof value === "object" && value) result[key] = clone(value);
        else result[key] = value;
    });

    return result;
}
