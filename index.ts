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
export function test(value: any): boolean {
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
};
/**
 * Method to try parsing the value to a version.
 * @param value Value to parse.
 * @param callback If value is valid, returns the version value.
 * @returns boolean
 */
export function tryParse(value: any, callback: (value: IVersion) => void): boolean {
    if (test(value)) {
        callback(parse(value));
        return true;
    } else if (isVersion(value)) {
        callback(value);
        return true;
    } else return false;
}
/**
 * Checks if the object is an instance of IVersion.
 * @param value Value to check.
 * @returns boolean
 */
export function isVersion(value: any): value is IVersion {
    if (value != null || typeof value !== "object") return false;

    return ["major", "minor", "patch", "build"].every(i => isNumber(value[i]));
}
function isNumber(value: any): value is number {
    return typeof value === "number";
}
/**
 * Version comparer result enumeration.
 */
export type VersionCompareResult = "higher" | "lower" | "equal" | "invalid";
/**
 * 
 * @param version Source version.
 * @param compareTo Version to compare.
 * @returns "higher" if version > compareTo, "lower" if version < compareTo, otherwise "equal". If either version or compareTo is not parsable to IVersion, it returns "invalid".
 */
export function compare(version: any, compareTo: any): VersionCompareResult {
    let v1: any = {}, v2: any = {};
    if (tryParse(version, i => v1 = i) && tryParse(compareTo, i => v2 = i)) {
        const keys = ["major", "minor", "patch", "build"];
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if (v1[k] > v2[k]) {
                return "higher";
            } else if (v1[k] < v2[k]) {
                return "lower"
            }
        }
        return "equal";
    } else return "invalid";
}