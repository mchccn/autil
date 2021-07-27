import clone from "./utils/clone";
import get from "./utils/get";
import { DeepKeyof } from "./utils/sort";

function numerical(v: any) {
    if (v instanceof Date) return v.getTime();

    if (Array.isArray(v)) return v.length;

    if (v instanceof Map || v instanceof Set) return v.size;

    return Number(v);
}

const sort = <T>(
    array: T[],
    opts?:
        | {
              by?: DeepKeyof<T>;
              type?: "string.length" | "alphabetically" | "number" | "boolean";
              order?: "asc" | "desc" | "ASC" | "DESC" | "ascending" | "descending" | "ASCENDING" | "DESCENDING" | 1 | -1;
              copy?: "deep" | "shallow" | boolean;
          }
        | ((a: T, b: T) => number)
) => {
    if (typeof opts === "function") return array.sort(opts);

    const target = opts?.copy ? (opts.copy === "deep" ? clone(array) : [...array]) : array;

    target.sort(
        !opts?.by
            ? undefined
            : (a, b) => {
                  //@ts-ignore
                  const A = get(a, opts.by!) as any;
                  //@ts-ignore
                  const B = get(b, opts.by!) as any;

                  if (typeof A === "undefined" && typeof B === "undefined") return 0;

                  if (typeof A === "undefined") return -1;

                  if (typeof B === "undefined") return 1;

                  if (opts.type === "string.length") return A.length - B.length;

                  if (opts.type === "alphabetically") return A.localeCompare(B);

                  if (opts.type === "number") return numerical(A) - numerical(B);

                  if (opts.type === "boolean") return A && B ? 0 : A ? 1 : B ? -1 : 0;

                  if (A instanceof Date && B instanceof Date) return A.getTime() - B.getTime();

                  if (Array.isArray(A) && Array.isArray(B)) return A.length - B.length;

                  if ((A instanceof Map && B instanceof Map) || (A instanceof Set && B instanceof Set)) return A.size - B.size;

                  if (typeof A === "string" && typeof B === "string") return A.localeCompare(B);

                  if (typeof A === "boolean" && typeof B === "boolean") return A && B ? 0 : A ? 1 : B ? -1 : 0;

                  return numerical(A) - numerical(B);
              }
    );

    const desc = opts?.order === -1 || (typeof opts?.order === "string" && opts.order.toLowerCase().startsWith("desc"));

    if (desc) target.reverse();

    return target;
};

export default sort;
