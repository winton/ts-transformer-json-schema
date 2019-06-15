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

	describe("Multiple validator types tests", () => {

		it("Interface with any or string", () => {
			interface IMultiple{
				multiple: string | number;
			}

			expect(schema<IMultiple>()).toStrictEqual({
				multiple: [
					{ type: "string" },
					{ type: "number" }
				]
			});
		});
	});

	describe("Enumerable validator types test", () => {

		it("Interface with any or string", () => {
			enum UserGroup {
				Admin = 'admin',
				Manager = 'manager',
				Employee = 'employee'
			}

			enum Asd {
				One = 1,
				Two = 2,
				Three = 3
			}

			interface IMultiple{
				enum: UserGroup;
			}

			interface IMultiple2{
				enum1: UserGroup;
				enum2: Asd;
			}

			schema<IMultiple>()
			schema<IMultiple2>()

			/*expect(schema<IMultiple>()).toStrictEqual({
				multiple: [
					{ type: "string" },
					{ type: "number" }
				]
			});*/
		});
	});

	describe("Neased validator types test", () => {

		it("Interface with any or string", () => {

			interface INeasted{
				num: number;
				str: string;
			}

			interface IParent{
				neasted: INeasted;
				num: number;
			}

			schema<IParent>()

			/*expect(schema<IMultiple>()).toStrictEqual({
				multiple: [
					{ type: "string" },
					{ type: "number" }
				]
			});*/
		});
	});

	describe("Extended validator types test", () => {

		it("Interface extends interface", () => {

			interface IExtendable{
				num: number;
				str: string;
			}

			interface IExtended extends IExtendable{
				any: any;
			}

			expect(schema<IExtended>()).toStrictEqual({
				num: "number",
				str: "string",
				any: "any"
			});
		});

		it("Interface extends interface and overrides", () => {

			interface IExtendable{
				num: number;
				str: string;
			}

			interface IOverrided extends IExtendable{
				any: any;
				str: any;
			}

			expect(schema<IOverrided>()).toStrictEqual({
				num: "number",
				str: "any",
				any: "any"
			});
		});
	});

	describe("Bulk types tests", () => {

		it("Interface with strings array", () => {
			interface IBulk{
				any: any;
				bool: boolean;
				num: number;
				str: string;
				aString: string[];
				aNumber: number[];
				aBoolean: boolean[];
			}

			expect(schema<IBulk>()).toStrictEqual({
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

