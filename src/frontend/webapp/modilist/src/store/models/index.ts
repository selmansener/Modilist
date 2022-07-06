// @filename: models.ts
import { Models } from "@rematch/core"
import { citiesModel } from "./addresses/Cities"
import { createAddressModel } from "./addresses/CreateAddress"
import { districtsModel } from "./addresses/Districts"
import { getDefaultAddressModel } from "./addresses/GetDefaultAddress"
import { updateAddressModel } from "./addresses/UpdateAddress"
import { upsertAddressModel } from "./addresses/UpsertAddress"
import { getPreferedFabricPropertiesModel } from "./fabricProperties/GetFabricProperties"
import { upsertPreferedFabricPropertiesModel } from "./fabricProperties/UpsertFabricProperties"
import { getFitPreferencesModel } from "./fitPreferences/GetFitPreferences"
import { upsertFitPreferencesModel } from "./fitPreferences/UpsertFitPreferences"
import { createPaymentMethodModel } from "./paymentMethods/CreatePaymentMethod"
import { activeSalesOrderModel } from "./salesOrders/ActiveSalesOrder"
import { addOrUpdateFeedbackModel } from "./salesOrders/Feedback"
import { salesOrderDetailsModel } from "./salesOrders/SalesOrderDetails"
import { salesOrdersQueryModel } from "./salesOrders/SalesOrdersQuery"
import { getSizeInfoModel } from "./sizeInfo/GetSizeInfo"
import { upsertSizeInfoModel } from "./sizeInfo/UpsertSizeInfo"
import { getStylePreferencesModel } from "./stylePreferences/GetStylePreferences"
import { upsertStylePreferencesModel } from "./stylePreferences/UpsertStylePreferences"
import { createSubscriptionModel } from "./subscriptions/CreateSubscription"
import { getSubscriptionModel } from "./subscriptions/GetSubscription"
import { updateSubscriptionMaxPricingLimitModel } from "./subscriptions/UpdateSubscriptionMaxPricingLimit"
import { activateAccountModel } from "./users/ActivateAccount"
import { createAccountModel } from "./users/CreateAccount"
import { getAccountModel } from "./users/GetAccount"
import { updateAccountModel } from "./users/UpdateAccount"
import { stepperSubscription } from "./welcome/StepperSubscription"
import { welcomePageStepper } from "./welcome/WelcomePageStepper"

export interface RootModel extends Models<RootModel> {
  createAccountModel: typeof createAccountModel,
  updateAccountModel: typeof updateAccountModel,
  getAccountModel: typeof getAccountModel,
  activateAccountModel: typeof activateAccountModel,
  welcomePageStepper: typeof welcomePageStepper,
  getStylePreferencesModel: typeof getStylePreferencesModel,
  upsertStylePreferencesModel: typeof upsertStylePreferencesModel,
  getDefaultAddressModel: typeof getDefaultAddressModel,
  createAddressModel: typeof createAddressModel,
  updateAddressModel: typeof updateAddressModel,
  upsertAddressModel: typeof upsertAddressModel,
  citiesModel: typeof citiesModel,
  districtsModel: typeof districtsModel,
  getSizeInfoModel: typeof getSizeInfoModel,
  upsertSizeInfoModel: typeof upsertSizeInfoModel,
  getPreferedFabricPropertiesModel: typeof getPreferedFabricPropertiesModel,
  upsertPreferedFabricPropertiesModel: typeof upsertPreferedFabricPropertiesModel,
  getFitPreferencesModel: typeof getFitPreferencesModel,
  upsertFitPreferencesModel: typeof upsertFitPreferencesModel,
  getSubscriptionModel: typeof getSubscriptionModel,
  createSubscriptionModel: typeof createSubscriptionModel,
  updateSubscriptionMaxPricingLimitModel: typeof updateSubscriptionMaxPricingLimitModel,
  createPaymentMethodModel: typeof createPaymentMethodModel,
  stepperSubscription: typeof stepperSubscription,
  salesOrdersQueryModel: typeof salesOrdersQueryModel,
  salesOrderDetailsModel: typeof salesOrderDetailsModel,
  addOrUpdateFeedbackModel: typeof addOrUpdateFeedbackModel,
  activeSalesOrderModel: typeof activeSalesOrderModel,
}

export const models: RootModel = {
  createAccountModel,
  updateAccountModel,
  getAccountModel,
  activateAccountModel,
  welcomePageStepper,
  getStylePreferencesModel,
  upsertStylePreferencesModel,
  getDefaultAddressModel,
  createAddressModel,
  updateAddressModel,
  upsertAddressModel,
  citiesModel,
  districtsModel,
  getSizeInfoModel,
  upsertSizeInfoModel,
  getPreferedFabricPropertiesModel,
  upsertPreferedFabricPropertiesModel,
  getFitPreferencesModel,
  upsertFitPreferencesModel,
  getSubscriptionModel,
  createSubscriptionModel,
  updateSubscriptionMaxPricingLimitModel,
  createPaymentMethodModel,
  stepperSubscription,
  salesOrdersQueryModel,
  salesOrderDetailsModel,
  addOrUpdateFeedbackModel,
  activeSalesOrderModel,
}