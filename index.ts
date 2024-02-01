export type VersionCompareResult = "higher" | "lower" | "equal" | "invalid";
class Version implements IVersion {
    constructor(
        public major: number,
        public minor: number,
        public patch: number,
        public build: number
    ) { }

    /**
     * 
     * @param version Version to compare.
     * @returns 
     * * "higher" if current version > compared version
     * * "lower" if current version < compared version
     * * "invalid" if the compared version is not an IVersion instance.
     * * otherwise "equal".
     */
    compare(version: IVersion): VersionCompareResult {
        if (!isVersion(version)) return "invalid"
        const v1: any = this;
        const v2: any = version;
        const keys = ["major", "minor", "patch", "build"];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((v1[key] ?? 0) > (v2[key] ?? 0)) {
                return "higher";
            } else if ((v1[key] ?? 0) < (v2[key] ?? 0)) {
                return "lower"
            }
        }
        return "equal";
    }
    toString() {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
}
export interface IVersion {
    major: number;
    minor: number;
    patch: number;
    build: number;
    compare(version: IVersion): VersionCompareResult;
    toString(): string;
};
export const Version0 = parse("0.0.0");
Object.seal(Version0);
Object.freeze(Version0);


/**
 * Test's if the string value met the criteria.
 * @param value String to test.
 * @returns boolean
 */
export function test(value: any): boolean {
    const pattern = /^([1-9]\d*|0)(\.(([1-9]\d*)|0)){0,3}$/;
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
    if (value != null
        || typeof value !== "object"
        || !isNumber(value.major)
        || !isNumber(value.minor)
    ) return false;

    return ["patch", "build"].every(i => value[i] == null || isNumber(value[i]));

    function isNumber(value: any) {
        return typeof value === "number" && value >= 0;
    }
}

export default {
    increment,
    isVersion,
    parse,
    test,
    tryParse,
}