import { USER, UserRow } from "./merquery";
import { DSLContext } from "merquery-core";

export class UserRepository {
  constructor(private dsl: DSLContext) {}

  async findById(id: string): Promise<UserRow | undefined> {
    return this.dsl
      .selectFrom(USER)
      .where(USER.ID.equals(id))
      .fetchOne();
  }

  async fetchPaidUsers(): Promise<UserRow[]> {
    return this.dsl
      .selectFrom(USER)
      .where(USER.ACCOUNT_STATUS.equals("PREMIUM"))
      .or(USER.ACCOUNT_STATUS.equals("PREMIUMPLUS"))
      .fetchAll();
  }

  async upgradeToPremium(id: string): Promise<void> {
    return this.dsl
      .update(USER)
      .set(USER.ACCOUNT_STATUS.FIELD, "PREMIUM")
      .where(USER.ID.equals(id))
      .execute();
  }

  async createUser(id: string, name: string): Promise<void> {
    return this.dsl
      .insertInto(
        USER,
        USER.ID.FIELD,
        USER.USERNAME.FIELD,
        USER.ACCOUNT_STATUS.FIELD
      )
      .values(id, name, "FREE")
      .onDuplicateKeyUpdate()
      .set(USER.ACCOUNT_STATUS.FIELD, "FREE")
      .execute();
  }
}
