// @filename: models.ts
import { Models } from "@rematch/core"
import { createStylePreferencesModel } from "./stylePreferences/CreateStylePreferences"
import { getStylePreferencesModel } from "./stylePreferences/GetStylePreferences"
import { updateStylePreferencesModel } from "./stylePreferences/UpdateStylePreferences"
import { createAccountModel } from "./users/CreateAccount"
import { getAccountModel } from "./users/GetAccount"
import { updateAccountModel } from "./users/UpdateAccount"
import { welcomePageModel } from "./welcome/WelcomePageModel"
import { welcomeStepsModel } from "./welcome/WelcomeStepsModel"

export interface RootModel extends Models<RootModel> {
  createAccountModel: typeof createAccountModel,
  updateAccountModel: typeof updateAccountModel,
  getAccountModel: typeof getAccountModel,
  welcomeStepsModel: typeof welcomeStepsModel,
  welcomePageModel: typeof welcomePageModel,
  getStylePreferencesModel: typeof getStylePreferencesModel,
  createStylePreferencesModel: typeof createStylePreferencesModel,
  updateStylePreferencesModel: typeof updateStylePreferencesModel
}

export const models: RootModel = {
  createAccountModel,
  updateAccountModel,
  getAccountModel,
  welcomeStepsModel,
  welcomePageModel,
  getStylePreferencesModel,
  createStylePreferencesModel,
  updateStylePreferencesModel
}