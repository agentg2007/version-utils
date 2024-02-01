# @nthity/version-utils

Light-weight version utilities npm module.

## Installation

```
npm i @nthity/version-utils
```

## Properties

|       | Data Type |
| ----- | --------- |
| major | integer   |
| minor | integer   |
| patch | integer   |
| build | integer   |

## Change Log

[See change log.](./CHANGELOG.md)

## Methods

### compare

Compares versions.

```
compare(version: any, compareTo: any): VersionCompareResult
```

> Usage:
>
> ```typescript
> var v1 = "1.0.0";
> var v2 = "1.0.0.3";
>
> //Returns "lower"
> console.log(compare(v1, v2));
> ```
>
> Parameters:
>
> > **version** - Version to compare from.  
> > **compareTo** - Version to compare to.
>
> Returns:
>
> > | Value   | DataType | Description                                                          |
> > | ------- | -------- | -------------------------------------------------------------------- |
> > | higher  | string   | If **version** is greater than **compareTo**.                        |
> > | lower   | string   | If **version** is lesser than **compareTo**.                         |
> > | equal   | string   | If both **version** and **compareTo** are equal.                     |
> > | invalid | string   | If either **version** or **compareTo** are not parsable to IVersion. |

### increment

Increments the current version.

```
increment(version: IVersion, target: "major" | "minor" | "patch" | "build")
```

> Usage:
>
> ```typescript
> var v1 = parse("1.0.0");
> increment(v1, "minor");
> //Returns 1.1.0.0
> console.log(v1);
> ```
>
> Parameters:
>
> > **version** - Version to increment.  
> > **target** - Property to increment.
> >
> > target values:
> >
> > - major
> > - minor
> > - patch
> > - build
>
> Returns:
>
> Incremented value.

### isVersion

Checks if an object is an IVersion.

```
isVersion(value: any) : boolean
```

> Usage:
>
> ```typescript
> var v1 = parse("1.0.0");
> //Returns true
> console.log(isVersion(v1));
> var v2 = "someobject";
> //Returns false
> console.log(isVersion(v2));
> ```
>
> Parameter:
>
> > **value** - Version to check.
>
> Returns:
>
> > True if it is an IVersion object, otherwise, false.

### parse

Parses a string in to an IVersion instance.

```
parse(value: string): IVersion
```

> Usage:
>
> ```typescript
> const version = parse("1.2.3");
> //creates IVersion object { major: 1, minor: 2, patch: 3, build: 0}
> console.log(version);
> ```
>
> Parameter:  
> **value** - Value to parse.
>
> Returns:
>
> > IVersion value object.

### test

Tests if the value can be parsed to IVersion object.

```
test(value: any): boolean
```

> Usage:
>
> ```typescript
> //Returns true
> console.log(test("1.2.3"));
> //Returns false
> console.log(test("1.2.3.A"));
> ```
>
> Parameter:  
> **value** - Value to test.
>
> Returns:
>
> > True if it is a valid value, otherwise false.

### tryParse

Tries to parse a value into IVersion object.

```
tryParse(value: any, callback: (version: IVersion) => void): boolean
```

> Usage:
>
> ```typescript
> var version?: IVersion = null;
> //Returns true
> console.log(tryParse("1.2.3", (i) => (version = i)));
> //Returns IVersion object { major: 1, minor: 2, patch: 3, build: 0 }
> console.log(version);
> ```
>
> Parameter:  
> **value** - Value to test.
>
> Returns:
>
> > True if it is a valid value, otherwise false.
