class Version implements IVersion {
    constructor(
        public major: number,
        public minor: number,
        public patch: number,
        public build: number
    ) { }

    toString() {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
}
export interface IVersion {
    major: number;
    minor: number;
    patch: number;
    build: number;
    toString(): string;
};
export const Version0 = parse("0.0.0");
Object.seal(Version0);
Object.freeze(Version0);

const pattern = /^([1-9]\d*|0)(\.(([1-9]\d*)|0)){0,3}$/;

/**
 * Test's if the string value met the criteria.
 * @param value String to test.
 * @returns boolean
 */
export function test(value: string): boolean {
    return typeof value === "string" && pattern.test(value);
}
/**
 * Parses a string value to a IVersion object instance.
 * @param value String to parse.
 * @returns IVersion instance
 */
export function parse(value: string): IVersion {
    if (test(value)) {
        const values = value.split(".").map(i => Number(i));
        if (values.includes(NaN)) {
            throw new Error("InvalidVersionString");
        }
        while (values.length < 4) values.push(0);
        return new Version(values[0], values[1], values[2], values[3]);
    } else {
        throw new Error("ParsingError")
    }
}
/**
 * Increments the version's major/minor/patch/build property.
 * @param version 
 * @param target major, minor, patch, build
 * @returns IVersion
 */
export function increment(
    version: IVersion,
    target: "major" | "minor" | "patch" | "build" = "patch"
): IVersion {
    version[target] += 1;
    return version;
}