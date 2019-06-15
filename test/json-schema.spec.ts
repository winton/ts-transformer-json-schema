"use strict";

import { schema } from '../index';

describe("Test json schema tranformer", () => {

	describe("Single type tests", () => {

		it("Without interface", () => {
			expect(schema()).toStrictEqual({});
		});

		it("Empty interface", () => {
			interface IEmpty { }

			expect(schema<IEmpty>()).toStrictEqual({});
		});

		it("Interface with string", () => {
			interface IString {
				str: string;
			}

			expect(schema<IString>()).toStrictEqual({ str: { type: "string" } });
		});

		it("Interface with any", () => {
			interface IAny {
				any: any;
			}

			expect(schema<IAny>()).toStrictEqual({ any: { type: "any" } });
		});

		it("Interface with number", () => {
			interface INumber {
				num: number;
			}

			expect(schema<INumber>()).toStrictEqual({ num: { type: "number" } });
		});

		it("Interface with boolean", () => {
			interface IBool {
				bool: boolean;
			}

			expect(schema<IBool>()).toStrictEqual({ bool: { type: "boolean" } });
		});
	});

	describe("Array type tests", () => {

		it("Interface with numbers array", () => {
			interface IArray {
				num_array: number[];
			}

			expect(schema<IArray>()).toStrictEqual({ num_array: { type: "array" } });
		});

		it("Interface with strings array", () => {
			interface IArray {
				str_array: string[];
			}

			expect(schema<IArray>()).toStrictEqual({ str_array: { type: "array" } });
		});

		it("Interface with strings array using Array<T>", () => {
			interface IArray {
				str_array: Array<string>;
			}

			expect(schema<IArray>()).toStrictEqual({ str_array: { type: "array" } });
		});

		it("Interface with strings array using Array<T>", () => {
			interface IArrayMultipleTypes {
				mul_array: Array<string | number>;
			}

			expect(schema<IArrayMultipleTypes>()).toStrictEqual({ mul_array: { type: "array" } });
		});
	});

	describe("Union validator types tests", () => {

		it("Interface with any or string", () => {
			interface IUnion {
				union: any | string;
			}

			expect(schema<IUnion>()).toStrictEqual({
				union: { type: "any" }
			});
		});

		it("Interface with string or number", () => {
			interface IUnion {
				union: string | number;
			}

			expect(schema<IUnion>()).toStrictEqual({
				union: [
					{ type: "string" },
					{ type: "number" }
				]
			});
		});

		it("Interface with string, number or boolean", () => {
			interface IUnion {
				optional: string | number | boolean ;
			}

			expect(schema<IUnion>()).toStrictEqual({
				optional: [
					{ type: "string" }, 
					{ type: "number" }, 
					{ type: "boolean" },
					{ type: "boolean" }
				]
			});
		});

		it("Interface with string or boolean", () => {
			interface IUnion {
				optional: string | boolean ;
			}

			expect(schema<IUnion>()).toStrictEqual({
				optional: [
					{ type: "string" }, 
					{ type: "boolean" },
					{ type: "boolean" }
				]
			});
		});

		it("Interface with string or number[]", () => {
			interface IUnion {
				optional: string | number[] ;
			}

			expect(schema<IUnion>()).toStrictEqual({
				optional: [
					{ type: "string" }, 
					{ type: "array" }
				]
			});
		});
	});

	describe("Intersection validator types tests", () => {

		it("Interface with any or string", () => {

			interface IIntersectionPart1 {
				part1: string;
			}

			interface IIntersectionPart2 {
				part2: number;
			}

			interface IIntersection {
				combined : IIntersectionPart1 & IIntersectionPart2;
			}

			expect(schema<IIntersection>()).toStrictEqual({
				combined: {
					part1: { type: "string" },
					part2: { type: "number" }
				}
			});
		});
	});

	describe("Enumerable validator types test", () => {

		it("Interface with enmerable strings", () => {
			enum UserGroup {
				Admin = 'admin',
				Manager = 'manager',
				Employee = 'employee'
			}

			interface IEnumerable {
				enum: UserGroup;
			}

			expect(schema<IEnumerable>()).toStrictEqual({
				enum: { type: 'enum', values: ['admin', 'manager', 'employee'] }
			});
		});

		it("Interface with enmerable default numbers", () => {
			enum UserGroup {
				Admin,
				Manager,
				Employee
			}

			interface IEnumerable {
				enum_num: UserGroup;
			}

			expect(schema<IEnumerable>()).toStrictEqual({
				enum_num: { type: 'enum', values: [0, 1, 2] }
			});
		});

		it("Interface with enmerable numbers", () => {
			enum UserGroup {
				Admin = 1,
				Manager = 2,
				Employee = 5
			}

			interface IEnumerable {
				enum_num: UserGroup;
			}

			expect(schema<IEnumerable>()).toStrictEqual({
				enum_num: { type: 'enum', values: [1, 2, 5] }
			});
		});

		it("Interface with mixed enmerable", () => {
			enum UserGroup {
				Admin = 1,
				Manager = 2,
				Employee = 'string'
			}

			interface IEnumerable {
				enum_mixed: UserGroup;
			}

			expect(schema<IEnumerable>()).toStrictEqual({
				enum_mixed: { type: 'enum', values: [1, 2, 'string'] }
			});
		});
	});

	describe("Neased validator types test", () => {

		it("Basic nester interfaces", () => {

			interface INeasted {
				num: number;
				str: string;
			}

			interface IParent {
				neasted: INeasted;
				num: number;
			}

			expect(schema<IParent>()).toStrictEqual({
				neasted: { 
					num: { type: 'number'},
					str: { type: 'string'}
				},
				num: { type: 'number'}
			});
		});
	});

	describe("Extended validator types test", () => {

		it("Interface extends interface", () => {

			interface IExtendable {
				num: number;
				str: string;
			}

			interface IExtended extends IExtendable {
				any: any;
			}

			expect(schema<IExtended>()).toStrictEqual({
				num: { type: "number" },
				str: { type: "string" },
				any: { type: "any" }
			});
		});

		it("Interface extends interface and overrides", () => {

			interface IExtendable {
				num: number;
				str: string;
			}

			interface IOverrided extends IExtendable {
				any: any;
				str: any;
			}

			expect(schema<IOverrided>()).toStrictEqual({
				num: { type: "number" },
				str: { type: "any" },
				any: { type: "any" }
			});
		});
	});

	describe("Bulk types tests", () => {

		it("Interface with strings array", () => {
			interface IBulk {
				any: any;
				bool: boolean;
				num: number;
				str: string;
				aString: string[];
				aNumber: number[];
				aBoolean: boolean[];
			}

			expect(schema<IBulk>()).toStrictEqual({
				any: { type: "any" },
				bool: { type: "boolean" },
				num: { type: "number" },
				str: { type: "string" },
				aString: { type: "array" },
				aNumber: { type: "array" },
				aBoolean: { type: "array" }
			});
		});

	});

	describe("Optional types tests", () => {

		it("Optional property any", () => {
			interface IOptional {
				optional?: any;
			}

			expect(schema<IOptional>()).toStrictEqual({
				optional: { type: "any", optional: true }
			});
		});

		it("Optional property union", () => {
			interface IOptional {
				readonly optional?: string | number ;
			}

			expect(schema<IOptional>()).toStrictEqual({
				optional: [{ type: "string" }, { type: "number" }]
			});
		});
	});
});

