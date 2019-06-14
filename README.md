# ts-transformer-json-schema
A TypeScript custom transformer to obtain JSON schema of interface

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Downloads](https://img.shields.io/npm/dm/ts-transformer-json-schema.svg)](https://www.npmjs.com/package/ts-transformer-json-schema)

# Requirement
TypeScript >= 2.4.1

# What is this package

This package is custom ts transformer which compiles TS Interface to json schema.
Main intention for this package is to facilitate usage of TS Intefraces for [Moleculer validator](https://moleculer.services/docs/0.13/validating.html).

Moleculer validator uses [fast-validator](https://github.com/icebob/fastest-validator)

## How to use Json-schema

```
$ npm install ts-transformer-json-schema --save
```

```ts
import { schema } from 'ts-transformer-json-schema';

interface IExample {
  str: string;
  num: number;
  bool: boolean;
  obj: any;
  array: number[];
  array2: Array<number>
}
const IExample_schema = schema<Props>();

console.log(IExample_schema); // { str: "string", num: "number" ... }
```

## How to use with Moleculer

In order to start using it with Moleculer you have to change compiler to Ttypescript.
You need to change it for build, ts-node and jest.
But first follow the guide how to use the custom transformer with ttypescript.

```ts
import { schema } from 'ts-transformer-json-schema';

interface IUser {
	name: string;
}

const GreeterService: ServiceSchema = {
  // ...
	welcome: {
		params: schema<IUser>(),
		handler({ params }: Context<IUser>) {
			return `Welcome, ${params.name}`;
    }
  }
  // ...
}
```

## How to use the custom transformer

Unfortunately, TypeScript itself does not currently provide any easy way to use custom transformers (See https://github.com/Microsoft/TypeScript/issues/14419).
The followings are the example usage of the custom transformer.

### ttypescript

See [examples/ttypescript](examples/ttypescript) for detail.
See [ttypescript's README](https://github.com/cevek/ttypescript/blob/master/README.md) for how to use this with module bundlers such as webpack or Rollup.

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "plugins": [
      { "transform": "ts-transformer-json-schema/transformer" }
    ]
  },
  // ...
}
```

### TypeScript API

See [test](test) for detail.
You can try it with `$ npm test`.

# Note

* The `schema` function can only be used as a call expression. Writing something like `schema.toString()` results in a runtime error.
* `schema` does not work with a dynamic type parameter, i.e., `schema<T>()` in the following code is converted to an empty object(`{}`).

# License

MIT

[travis-image]:https://travis-ci.org/ipetrovic11/ts-transformer-json-schema.svg?branch=master
[travis-url]:https://travis-ci.org/ipetrovic11/ts-transformer-json-schema
[npm-image]:https://img.shields.io/npm/v/ts-transformer-json-schema.svg?style=flat
[npm-url]:https://www.npmjs.com/package/ts-transformer-json-schema
