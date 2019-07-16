"use strict";

import { schema } from '../index';
import { IExternal } from './interfaces';
import { IEmail, IDate, IForbidden, IUrl, IUUID } from '../predefined';

describe("Test json schema tranformer", () => {

	describe("Empty variations", () => {
		it("Without interface", () => {
			expect(schema()).toStrictEqual({});
		});

		it("Empty interface", () => {
			interface IEmpty { }

			expect(schema<IEmpty>()).toStrictEqual({});
		});

		it("Empty type", () => {
			type IEmpty = {};

			expect(schema<IEmpty>()).toStrictEqual({});
		});
	});

	describe("Single type tests", () => {
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

	describe("Optional single type tests", () => {
		it("Interface with optional string", () => {
			interface IString {
				str?: string;
			}

			expect(schema<IString>()).toStrictEqual({ str: { type: "string", optional: true } });
		});

		it("Interface with optional any", () => {
			interface IAny {
				any?: any;
			}

			expect(schema<IAny>()).toStrictEqual({ any: { type: "any", optional: true } });
		});

		it("Interface with optional number", () => {
			interface INumber {
				num?: number;
			}

			expect(schema<INumber>()).toStrictEqual({ num: { type: "number", optional: true } });
		});

		it("Interface with optional boolean", () => {
			interface IBool {
				bool?: boolean;
			}

			expect(schema<IBool>()).toStrictEqual({ bool: { type: "boolean", optional: true } });
		});
	});

	describe("Single predefined type tests", () => {
		it("Predefined IEmail", () => {

			interface IPredefined {
				email: IEmail;
			}

			expect(schema<IPredefined>()).toStrictEqual({ email: { type: "email" } });
		});

		it("Predefined IDate", () => {

			interface IPredefined {
				date: IDate;
			}

			expect(schema<IPredefined>()).toStrictEqual({ date: { type: "date" } });
		});

		it("Predefined IForbidden", () => {

			interface IPredefined {
				forbidden: IForbidden;
			}

			expect(schema<IPredefined>()).toStrictEqual({ forbidden: { type: "forbidden" } });
		});

		it("Predefined IUrl", () => {

			interface IPredefined {
				url: IUrl;
			}

			expect(schema<IPredefined>()).toStrictEqual({ url: { type: "url" } });
		});

		it("Predefined IUUID", () => {

			interface IPredefined {
				uuid: IUUID;
			}

			expect(schema<IPredefined>()).toStrictEqual({ uuid: { type: "uuid" } });
		});
	});

	describe("Union type tests", () => {
		it("Union string and any", () => {
			interface IAny {
				any: any | string;
			}

			expect(schema<IAny>()).toStrictEqual({ any: { type: "any" } });
		});

		it("Union string and number", () => {
			interface IUnion {
				union: string | number;
			}

			expect(schema<IUnion>()).toStrictEqual({ union: [{ type: "string" }, { type: "number" }] });
		});

		it("Union string and boolean", () => {
			interface IUnion {
				union: string | boolean;
			}

			expect(schema<IUnion>()).toStrictEqual({ union: [{ type: "string" }, { type: "boolean" }] });
		});

		it("Union string and predefined", () => {
			interface IUnion {
				union: string | IEmail;
			}

			expect(schema<IUnion>()).toStrictEqual({ union: [{ type: "string" }, { type: "email" }] });
		});

		it("Union predefined and predefined", () => {
			interface IUnion {
				union: IEmail | IUUID;
			}

			expect(schema<IUnion>()).toStrictEqual({ union: [{ type: "email" }, { type: "uuid" }] });
		});
	});

	describe("Intersection types tests", () => {

		it("Interface with intersection any and string", () => {

			interface IBase1 {
				part1: string;
			}

			interface IBase2 {
				part2: number;
			}

			interface IIntersection {
				combined: IBase1 & IBase2;
			}

			expect(schema<IIntersection>()).toStrictEqual({
				combined: {
					type: 'object', props: {
						part1: { type: "string" },
						part2: { type: "number" }
					}
				}
			});
		});
	});

	describe("Generic type tests", () => {
		it("Generic string type", () => {
			interface IGeneric<T> {
				generic: T;
			}

			expect(schema<IGeneric<string>>()).toStrictEqual({ generic: { type: "string" } });
		});

		it("Generic string type", () => {
			interface IGeneric<T> {
				generic: T;
			}

			expect(schema<IGeneric<any>>()).toStrictEqual({ generic: { type: "any" } });
		});

		it("Generic boolean type", () => {
			interface IGeneric<T> {
				generic: T;
			}

			expect(schema<IGeneric<boolean>>()).toStrictEqual({ generic: { type: "boolean" } });
		});

		it("Generic predefined type", () => {
			interface IGeneric<T> {
				generic: T;
			}

			expect(schema<IGeneric<IEmail>>()).toStrictEqual({ generic: { type: "email" } });
		});

		it("Generic union type", () => {
			interface IGeneric<T> {
				generic: T;
			}

			expect(schema<IGeneric<string | number>>()).toStrictEqual({ generic: [{ type: "string" }, { type: "number" }] });
		});
	});

});
