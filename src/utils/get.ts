import { DeepKeyof } from "./sort";

type Split<Input extends string, Separator extends string = ""> = Input extends ""
    ? []
    : Input extends `${infer Start}${Separator}${infer End}`
    ? [Start, ...Split<End, Separator>]
    : [Input];

type Join<A extends ReadonlyArray<unknown>, Sep extends string = ""> = A extends readonly [infer Head, ...infer Rest]
    ? Join<Rest, Sep> extends ""
        ? `${Head & (string | number | bigint | boolean)}`
        : `${Head & (string | number | bigint | boolean)}${Sep}${Join<Rest, Sep>}`
    : "";

type DeepGet<T extends object, K extends DeepKeyof<T>> = Split<K, "."> extends [infer Key, ...infer Rest]
    ? Rest extends []
        ? T[Key & keyof T]
        : T[Key & keyof T] extends object
        ? DeepGet<T[Key & keyof T], Join<Rest, "."> & DeepKeyof<T[Key & keyof T]>>
        : never
    : never;

export default function get<T extends object, K extends DeepKeyof<T>>(o: T, k: K): DeepGet<T, K> | undefined {
    const [key, ...rest] = k.split(".");

    let value = o[key as keyof typeof o] as any;

    for (const k of rest) {
        if (!(k in value)) return undefined;

        value = value[k as keyof typeof value];
    }

    return value;
}
