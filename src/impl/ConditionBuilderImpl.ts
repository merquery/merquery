import { Condition, ConditionCollection } from "../Condition";
import { ConditionBuilder } from "../ConditionBuilder";
import { ConditionOperator } from "../ConditionOperator";
export class ConditionBuilderImpl implements ConditionBuilder {
  getCondition(): ConditionCollection {
    return this.conditionCollection;
  }

  static initial(condition: Condition) {
    return new ConditionBuilderImpl({
      kind: "ConditionCollection",
      conditions: [{ condition: condition, operator: ConditionOperator.And }]
    });
  }

  constructor(private conditionCollection: ConditionCollection) {}

  and(condition: Condition): ConditionBuilderImpl {
    return new ConditionBuilderImpl({
      kind: "ConditionCollection",
      conditions: [
        ...this.conditionCollection.conditions,
        { condition: condition, operator: ConditionOperator.And }
      ]
    });
  }
  or(condition: Condition): ConditionBuilderImpl {
    return new ConditionBuilderImpl({
      kind: "ConditionCollection",
      conditions: [
        ...this.conditionCollection.conditions,
        { condition: condition, operator: ConditionOperator.Or }
      ]
    });
  }
}
