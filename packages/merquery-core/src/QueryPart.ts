import { Context } from "./Context";

export interface QueryPartInternal {
  accept(ctx: Context): void;
}
