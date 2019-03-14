import { DSLConfig } from "../../DSLConfig";
import { DSLContextImpl } from "./DSLContextImpl";
import { Driver } from "../../Driver";
import { DSLContext } from "../../DSLContext";
import { Condition } from "../../Condition";
import { ConditionBuilderImpl } from "../ConditionBuilderImpl";
import { ConditionBuilder } from "../../ConditionBuilder";
export namespace DSL {
  export function using(config: DSLConfig): DSLContext {
    return new DSLContextImpl(config);
  }

  export function withDriver(driver: Driver): DSLContext {
    return new DSLContextImpl({ driver: driver });
  }

  export function condition(condition: Condition): ConditionBuilder {
    return ConditionBuilderImpl.initial(condition);
  }
}
