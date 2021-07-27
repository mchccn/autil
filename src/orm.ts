import clone from "./utils/clone";

type KeysToValues<A, T> = A extends readonly [infer Key, ...infer Rest] ? readonly [T[Key & keyof T], ...KeysToValues<Rest, T>] : readonly [];

export class ORMArray<T> extends Array<T> {
    #parent;
    #target?: T[];

    public constructor(items: T[], parent: T[]) {
        super();

        if (Array.isArray(items)) items.forEach((item, i) => (this[i] = item as T));

        this.#parent = parent;
    }

    public select<C extends "*" | readonly (keyof T)[]>(columns: C): ORMArray<C extends "*" ? T : Pick<T, (C & (keyof T)[])[number]>> {
        if (columns === "*") return new ORMArray(clone(this), this.#parent);

        return new ORMArray(
            clone(this.map((item) => Object.fromEntries(Object.entries(item).filter(([key]) => columns.includes(key as keyof T))))),
            this.#parent
        ) as ORMArray<C extends "*" ? T : Pick<T, (C & (keyof T)[])[number]>>;
    }

    public where() {}

    public update<C extends readonly (keyof T)[], V extends KeysToValues<C, T>>(columns: C, values: V) {
        if (!this.#target) {
            this.#parent.forEach((item) => {
                columns.forEach((col, i) => (item[col] = values[i]));
            });

            return new ORMArray(this.#parent, this.#parent);
        }

        this.#parent.forEach((item, i) => {
            if (this.#target!.includes(item)) columns.forEach((col, i) => (item[col] = values[i]));
        });

        return new ORMArray(this.#parent, this.#parent);
    }

    public delete<C extends "*" | readonly (keyof T)[]>(columns: C): Array<C extends "*" ? T : Pick<T, (C & (keyof T)[])[number]>> {
        if (columns === "*") {
            if (!this.#target) return [];

            this.#parent.forEach((item, i) => {
                if (this.#target!.includes(item)) this.#parent.splice(i, 1);
            });

            return new ORMArray(this.#parent, this.#parent);
        }

        if (!this.#target) {
            this.#parent.forEach((item) => {
                for (const key of columns) delete item[key as keyof typeof item];
            });

            return new ORMArray(this.#parent, this.#parent);
        }

        this.#parent.forEach((item, i) => {
            if (this.#target!.includes(item)) for (const key of columns) delete item[key as keyof typeof item];
        });

        return new ORMArray(this.#parent, this.#parent);
    }
}

const orm = <T>(array: T[]) => new ORMArray(array, array);

export default orm;
