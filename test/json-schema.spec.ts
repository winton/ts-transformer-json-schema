"use strict";

import { schema } from '../index';

describe("Test json schema tranformer", () => {

	describe("Basic test", () => {

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

	});

	/*describe("Test interface with string", () => {

	});*/

});

