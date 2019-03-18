import { buildCondition } from "../../../impl/driver/mysql/querybuilding/buildCondition";
import { ConditionOperator } from "../../../ConditionOperator";
import { val } from "../../../impl/util/val";
import { ConditionBuilderImpl } from "../../../impl/ConditionBuilderImpl";
import { buildConditions } from "../../../impl/driver/mysql/querybuilding/buildConditions";
import { OneOrMoreArrayUtil } from "../../../impl/OneOrMoreArray";
import { ConditionWithOperator } from "../../../ConditionWithOperator";
import { eq } from "../../../impl/util/eq";

test("buildConditions returns the condition if its the only one", () => {
  expect(
    buildConditions({
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
        {
          operator: ConditionOperator.And,
          condition: {
            kind: "ConditionCollection",
            conditions: OneOrMoreArrayUtil.fromArray([
              {
                operator: ConditionOperator.And,
                condition: eq(val(1), val(2))
              }
            ])
          }
        }
      ])
    })
  ).toBe("1 = 2");
});

test("buildConditions returns the condition if its the only one through nesting", () => {
  expect(
    buildConditions({
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
        {
          operator: ConditionOperator.And,
          condition: {
            kind: "ConditionCollection",
            conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
              {
                operator: ConditionOperator.And,
                condition: {
                  kind: "ConditionCollection",
                  conditions: OneOrMoreArrayUtil.fromArray<
                    ConditionWithOperator
                  >([
                    {
                      operator: ConditionOperator.And,
                      condition: {
                        kind: "ConditionCollection",
                        conditions: OneOrMoreArrayUtil.fromArray<
                          ConditionWithOperator
                        >([
                          {
                            operator: ConditionOperator.And,
                            condition: {
                              kind: "ConditionCollection",
                              conditions: OneOrMoreArrayUtil.fromArray<
                                ConditionWithOperator
                              >([
                                {
                                  operator: ConditionOperator.And,
                                  condition: {
                                    kind: "ConditionCollection",
                                    conditions: OneOrMoreArrayUtil.fromArray<
                                      ConditionWithOperator
                                    >([
                                      {
                                        operator: ConditionOperator.And,
                                        condition: eq(val(1), val(2))
                                      }
                                    ])
                                  }
                                }
                              ])
                            }
                          }
                        ])
                      }
                    }
                  ])
                }
              }
            ])
          }
        }
      ])
    })
  ).toBe("1 = 2");
});

test("buildConditions connects two conditions with an condition operator", () => {
  expect(
    buildConditions({
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
        {
          operator: ConditionOperator.And,
          condition: {
            kind: "ConditionCollection",
            conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
              {
                operator: ConditionOperator.And,
                condition: eq(val(1), val(2))
              },
              { operator: ConditionOperator.And, condition: eq(val(3), val(4)) }
            ])
          }
        }
      ])
    })
  ).toBe("1 = 2 AND 3 = 4");
});

test("buildCondition 2", () => {
  expect(
    buildConditions({
      kind: "ConditionCollection",
      conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
        {
          operator: ConditionOperator.And,
          condition: {
            kind: "ConditionCollection",
            conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
              {
                operator: ConditionOperator.And,
                condition: eq(val(1), val(2))
              },
              {
                operator: ConditionOperator.And,
                condition: {
                  kind: "ConditionCollection",
                  conditions: OneOrMoreArrayUtil.fromArray<
                    ConditionWithOperator
                  >([
                    {
                      operator: ConditionOperator.And,
                      condition: eq(val(3), val(4))
                    },
                    {
                      operator: ConditionOperator.Or,
                      condition: eq(val(5), val(6))
                    }
                  ])
                }
              },
              {
                operator: ConditionOperator.And,
                condition: eq(val(9), val(10))
              }
            ])
          }
        },
        {
          operator: ConditionOperator.Or,
          condition: eq(val(7), val(8))
        }
      ])
    })
  ).toBe("(1 = 2 AND (3 = 4 OR 5 = 6) AND 9 = 10) OR 7 = 8");
});

test("buildCondition with empty collection", () => {
  expect(
    buildCondition(
      {
        kind: "ConditionCollection",
        conditions: OneOrMoreArrayUtil.fromArray<ConditionWithOperator>([
          { operator: ConditionOperator.And, condition: eq(val(1), val(2)) }
        ])
      },
      2
    )
  ).toBe("1 = 2");
});
