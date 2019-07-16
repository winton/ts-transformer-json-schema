"use strict";

const Validator = require('fastest-validator');
const v = new Validator();

import { schema } from '../index';
import { IExternal } from './interfaces';
import { IEmail, IDate, IForbidden, IUrl, IUUID } from '../predefined';

describe("Test validator directly with json schema transformer", () => {

	describe("Union optional", () => {
		it("Should succeed with email", () => {
			interface IUnion {
				union?: IEmail | IUUID;
			}

			expect(v.validate({ union: "john@acme.com"}, schema<IUnion>())).toBe(true);
		});

		it("Should succeed with email", () => {
			interface IUnion {
				union?: IEmail | IUUID;
			}

			expect(v.validate({union: "083c5eb4-87cc-42f4-9b9d-691af310a423"}, schema<IUnion>())).toBe(true);
		});

		it("Should succeed empty", () => {
			interface IUnion {
				union?: IEmail | IUUID;
			}

			expect(v.validate({}, schema<IUnion>())).toBe(true);
		});

		it("Should fail with number", () => {
			interface IUnion {
				union?: IEmail | IUUID;
			}

			expect(v.validate({union: 1}, schema<IUnion>())).toBeInstanceOf(Array)
		});

		it("Should fail with object", () => {
			interface IUnion {
				union?: IEmail | IUUID;
			}

			expect(v.validate({union: { email: "john@acme.com"}}, schema<IUnion>())).toBeInstanceOf(Array);
		});
	});

});
