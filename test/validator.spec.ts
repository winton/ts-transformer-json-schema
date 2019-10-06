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

	describe("Index interface", () => {
		it("Should succeed with object with string prop", () => {
			interface IIndex { 
				index: { [group: string]: string[] }
			}

			expect(v.validate({index: {a: "string" }}, schema<IIndex>())).toBe(true);
		});

		it("Should succeed with object with number prop", () => {
			interface IIndex { 
				index: { [group: string]: string[] }
			}

			expect(v.validate({index: {a: 1 }}, schema<IIndex>())).toBe(true);
		});

		it("Should succeed with object with object prop", () => {
			interface IIndex { 
				index: { [group: string]: string[] }
			}

			expect(v.validate({index: {a: {} }}, schema<IIndex>())).toBe(true);
		});

		it("Should fail with null", () => {
			interface IIndex { 
				index: { [group: string]: string[] }
			}

			expect(v.validate({index: null }, schema<IIndex>())).toBeInstanceOf(Array);
		});

		it("Should fail with string", () => {
			interface IIndex { 
				index: { [group: string]: string[] }
			}

			expect(v.validate({index: "string"}, schema<IIndex>())).toBeInstanceOf(Array);
		});

		it("Should fail with array", () => {
			interface IIndex { 
				index: { [group: string]: string[] }
			}

			expect(v.validate({index: [] }, schema<IIndex>())).toBeInstanceOf(Array);
		});

		it("Should fail without index prop", () => {
			interface IIndex { 
				index: { [group: string]: string[] }
			}

			expect(v.validate({a: {} }, schema<IIndex>())).toBeInstanceOf(Array);
		});

		it("Should succeed with valid index type prop", () => {
			enum Enumerable {
				a = 'a',
				b = 'b',
				c = 'c',
			}

			type Query = {
				[type in Enumerable]?: string | string[] ;
			};

			expect(v.validate({a: ['str', 'str'] }, schema<Query>())).toBe(true);
		});

		it("Should succeed with valid index type prop", () => {
			enum Enumerable {
				a = 'a',
				b = 'b',
				c = 'c',
			}

			type Query = {
				[type in Enumerable]?: string | string[] ;
			};

			expect(v.validate({a: 'str' }, schema<Query>())).toBe(true);
		});

		it("Should succeed without any prop", () => {
			enum Enumerable {
				a = 'a',
				b = 'b',
				c = 'c',
			}

			type Query = {
				[type in Enumerable]?: string | string[] ;
			};

			expect(v.validate({}, schema<Query>())).toBe(true);
		});

		it("Should fail with invalid index type prop", () => {
			enum Enumerable {
				a = 'a',
				b = 'b',
				c = 'c',
			}

			type Query = {
				[type in Enumerable]?: string | string[] ;
			};

			expect(v.validate({a: {} }, schema<Query>())).toBeInstanceOf(Array);
		});



	});

});
