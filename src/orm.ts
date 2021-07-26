import clone from "./utils/clone";

export class ORMArray<T> extends Array<T> {
    #parent;
    #target?: T[];

    public constructor(items: T[], parent: T[]) {
        super();

        if (Array.isArray(items)) items.forEach((item, i) => (this[i] = item as T));

        this.#parent = parent;
    }

    public select<C extends "*" | (keyof T)[]>(columns: C): ORMArray<C extends "*" ? T : Pick<T, (C & (keyof T)[])[number]>> {
        if (columns === "*") return new ORMArray(clone(this), this.#parent);

        return new ORMArray(
            clone(this.map((item) => Object.fromEntries(Object.entries(item).filter(([key]) => columns.includes(key as keyof T))))),
            this.#parent
        ) as ORMArray<C extends "*" ? T : Pick<T, (C & (keyof T)[])[number]>>;
    }

    public where() {}

    public update() {}

    public delete<C extends "*" | (keyof T)[]>(columns: C): Array<C extends "*" ? T : Pick<T, (C & (keyof T)[])[number]>> {
        if (columns === "*") {
            if (!this.#target) return [];

            this.#parent.forEach((item, i) => {
                if (this.#target!.includes(item)) this.#parent.splice(i, 1);
            });

            return this.#parent;
        }

        if (!this.#target) {
            this.#parent.forEach((item) => {
                for (const key of columns) delete item[key as keyof typeof item];
            });

            return this.#parent;
        }

        this.#parent.forEach((item, i) => {
            if (this.#target!.includes(item)) for (const key of columns) delete item[key as keyof typeof item];
        });

        return this.#parent;
    }
}

const orm = <T>(array: T[]) => new ORMArray(array, array);

export default orm;
