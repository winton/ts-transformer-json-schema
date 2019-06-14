"use strict";

import { keys } from '../index';

describe("Test json schema tranformer", () => {

	describe("Basic test", () => {

		it("Testing without interface", () => {
			expect(keys()).toStrictEqual({});
		});

		it("Testing empty interface", () => {
			interface IEmpty{}

			expect(keys<IEmpty>()).toStrictEqual({});
		});

		it("Testing interface with string", () => {
			interface IString{
				name: string;
			}

			expect(keys<IString>()).toStrictEqual({ name: "string"});
		});

		it("Without type, it should be converted to empty object!", () => {
			expect(keys()).toStrictEqual({});
		});

	});

	/*describe("Test interface with string", () => {

	});*/

});

