// @filename: models.ts
import { Models } from "@rematch/core"
import { createAccountModel } from "./users/CreateAccount"
import { getAccountModel } from "./users/GetAccount"
import { updateAccountModel } from "./users/UpdateAccount"

export interface RootModel extends Models<RootModel> {
  createAccountModel: typeof createAccountModel,
  updateAccountModel: typeof updateAccountModel,
  getAccountModel: typeof getAccountModel
}

export const models: RootModel = {
  createAccountModel,
  updateAccountModel,
  getAccountModel
}