import { Row } from "./Row";
export interface Record<R extends Row> {
  get<K extends keyof R>(key: K): R[K];
}
