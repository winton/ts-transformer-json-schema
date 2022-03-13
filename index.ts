import * as transformer from "./transformer";
import { ValidationSchema } from "fastest-validator";

export * from "./predefined";
export declare function schema<T extends object>(additional?: boolean): {[Property in keyof T]: ValidationSchema};
