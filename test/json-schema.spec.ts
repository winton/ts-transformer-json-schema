"use strict";

import { schema } from '../index';

describe("Test json schema tranformer", () => {

	describe("Single type tests", () => {

		it("Without interface", () => {
			expect(schema()).toStrictEqual({});
		});

		it("Empty interface", () => {
			interface IEmpty{}

			expect(schema<IEmpty>()).toStrictEqual({});
		});

		it("Interface with string", () => {
			interface IString{
				name: string;
			}

			expect(schema<IString>()).toStrictEqual({ name: "string"});
		});

		it("Interface with any", () => {
			interface IAny{
				target: any;
			}

			expect(schema<IAny>()).toStrictEqual({ target: "any"});
		});

		it("Interface with number", () => {
			interface INumber{
				target: number;
			}

			expect(schema<INumber>()).toStrictEqual({ target: "number"});
		});

		it("Interface with boolean", () => {
			interface IBool{
				target: boolean;
			}

			expect(schema<IBool>()).toStrictEqual({ target: "boolean"});
		});

		it("Interface with numbers array", () => {
			interface IArray{
				target: number[];
			}

			expect(schema<IArray>()).toStrictEqual({ target: "array"});
		});

		it("Interface with strings array", () => {
			interface IArray{
				target: string[];
			}

			expect(schema<IArray>()).toStrictEqual({ target: "array"});
		});

		it("Interface with strings array using Array<T>", () => {
			interface IArray{
				target: Array<string>;
			}

			expect(schema<IArray>()).toStrictEqual({ target: "array"});
		});
	});

	describe("Multiple types tests", () => {

		it("Interface with strings array", () => {
			interface IMultiple{
				any: any;
				bool: boolean;
				num: number;
				str: string;
				aString: string[];
				aNumber: number[];
				aBoolean: boolean[];
			}

			expect(schema<IMultiple>()).toStrictEqual({
				any: "any",
				bool: "boolean",
				num: "number",
				str: "string",
				aString: "array",
				aNumber: "array",
				aBoolean: "array"
			});
		});

	});
});

