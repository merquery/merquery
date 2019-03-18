import { Condition } from "../Condition";
import { ConditionCollection } from "../ConditionCollection";
import { ConditionBuilder } from "../ConditionBuilder";
import { ConditionOperator } from "../ConditionOperator";
import { OneOrMoreArrayUtil } from "./OneOrMoreArray";
import { ConditionWithOperator } from "../ConditionWithOperator";
export class ConditionBuilderImpl implements ConditionBuilder {
  getCondition(): ConditionCollection {
    return this.conditionCollection;
  }

  static initial(condition: Condition) {
    return new ConditionBuilderImpl({
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
        { condition: condition, operator: ConditionOperator.And }
      ])
    });
  }

  static extend(condition: ConditionCollection) {
    return new ConditionBuilderImpl(condition);
  }

  constructor(private conditionCollection: ConditionCollection) {}

  and(condition: Condition): ConditionBuilderImpl {
    return new ConditionBuilderImpl({
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.append(
        this.conditionCollection.conditions,
        [{ condition: condition, operator: ConditionOperator.And }]
      )
    });
  }
  or(condition: Condition): ConditionBuilderImpl {
    return new ConditionBuilderImpl({
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.append(
        this.conditionCollection.conditions,
        [{ condition: condition, operator: ConditionOperator.Or }]
      )
    });
  }
}
