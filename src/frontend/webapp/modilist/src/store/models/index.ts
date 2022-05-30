// @filename: models.ts
import { Models } from "@rematch/core"
import { citiesModel } from "./addresses/Cities"
import { createAddressModel } from "./addresses/CreateAddress"
import { districtsModel } from "./addresses/Districts"
import { getDefaultAddressModel } from "./addresses/GetDefaultAddress"
import { updateAddressModel } from "./addresses/UpdateAddress"
import { upsertAddressModel } from "./addresses/UpsertAddress"
import { createStylePreferencesModel } from "./stylePreferences/CreateStylePreferences"
import { getStylePreferencesModel } from "./stylePreferences/GetStylePreferences"
import { updateStylePreferencesModel } from "./stylePreferences/UpdateStylePreferences"
import { account } from "./users/Account"
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
  updateStylePreferencesModel: typeof updateStylePreferencesModel,
  getDefaultAddressModel: typeof getDefaultAddressModel,
  createAddressModel: typeof createAddressModel,
  updateAddressModel: typeof updateAddressModel,
  upsertAddressModel: typeof upsertAddressModel,
  citiesModel: typeof citiesModel,
  districtsModel: typeof districtsModel,
  account: typeof account
}

export const models: RootModel = {
  createAccountModel,
  updateAccountModel,
  getAccountModel,
  welcomeStepsModel,
  welcomePageModel,
  getStylePreferencesModel,
  createStylePreferencesModel,
  updateStylePreferencesModel,
  getDefaultAddressModel,
  createAddressModel,
  updateAddressModel,
  upsertAddressModel,
  citiesModel,
  districtsModel,
  account
}