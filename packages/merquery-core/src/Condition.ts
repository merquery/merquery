import { InCondition } from "./InCondition";
import { ComparatorCondition } from "./ComparatorCondition";
import { ConditionCollection } from "./ConditionCollection";

export type Condition = ComparatorCondition | ConditionCollection | InCondition;


