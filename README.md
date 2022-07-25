# @nthity/version-utils

Light-weight version utilities npm module. 

## Installation

```
npm i @nthity/version-utils
```

## Usage

```typescript
import { increment, parse, test } from "@nthity/version-utils";

//Returns 1.0.0.0
console.log(parse("1.0.0"));
//Returns 1.0.0.0
console.log(parse("1"));
//Returns 1.0.0.0
console.log(parse("1.0"));
//Returns true
console.log(test("1"));
//Returns true
console.log(test("1.0"));
//Returns true
console.log(test("1.0.0"));
//Returns true
console.log(test("1.0.0.0"));
//Returns false
console.log(test("1.0.0.0.0"));
//Returns false
console.log(test("1.a.b.c"));

const version = parse("1.2.3.4");
//Returns "1.2.3.4"
console.log(version.toString());

//Increments version number.
//Returns "1.2.4.4"
console.log(increment(version, "patch").toString());
```
