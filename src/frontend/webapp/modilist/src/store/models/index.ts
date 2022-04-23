// @filename: models.ts
import { Models } from "@rematch/core"
import { createAccountModel } from "./users/CreateAccount"
 
export interface RootModel extends Models<RootModel> {
  createAccountModel: typeof createAccountModel
}
 
export const models: RootModel = { createAccountModel }