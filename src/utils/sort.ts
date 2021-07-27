type Primitive = string | number | boolean | never | undefined | null | symbol;

type Stringable = string | number | bigint | boolean;

type Concat<T extends Stringable, U extends Stringable, TJoiner extends string = "."> = T extends "" ? U : U extends U ? `${T}${TJoiner}${U}` : never;

export type DeepKeyof<T, TPrefix extends string = "", TKeys extends keyof T = Exclude<keyof T, keyof unknown[]>> = [T] extends [never]
    ? never
    : TKeys extends Stringable
    ? T extends Primitive
        ? never
        : Concat<TPrefix, TKeys> | DeepKeyof<T[TKeys], Concat<TPrefix, TKeys>>
    : never;
