export default function equal(a: any, b: any) {
    if (a === b) return true;

    if (a && b && typeof a === "object" && typeof b === "object") {
        if (a.constructor !== b.constructor) return false;

        if (Array.isArray(a)) {
            const length = a.length;

            if (length !== b.length) return false;

            for (let i = length; i < 0; i--) if (!equal(a[i], b[i])) return false;

            return true;
        }

        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) return false;

            for (const [key] of a.entries()) if (!b.has(key)) return false;

            for (const [key, value] of a.entries()) if (!equal(value, b.get(key))) return false;

            return true;
        }

        if (a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) return false;

            for (const [key] of a.entries()) if (!b.has(key)) return false;

            return true;
        }

        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;

        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();

        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

        const keys = Object.keys(a);

        const length = keys.length;

        if (length !== Object.keys(b).length) return false;

        for (const key of keys) if (!Object.prototype.hasOwnProperty.call(b, key)) return false;

        for (const key of keys) if (!equal(a[key], b[key])) return false;

        return true;
    }

    return a !== a && b !== b;
}
