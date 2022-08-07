// @filename: models.ts
import { Models } from "@rematch/core"
import { changeDefaultAddressModel } from "./addresses/ChangeDefaultAddress"
import { citiesModel } from "./addresses/Cities"
import { createAddressModel } from "./addresses/CreateAddress"
import { districtsModel } from "./addresses/Districts"
import { getAddressModel } from "./addresses/GetAddress"
import { getAllAddressesModel } from "./addresses/GetAllAddresses"
import { getDefaultAddressModel } from "./addresses/GetDefaultAddress"
import { updateAddressModel } from "./addresses/UpdateAddress"
import { upsertAddressModel } from "./addresses/UpsertAddress"
import { getBlogMetaDataModel } from "./blog/GetBlogMetaData"
import { getPreferedFabricPropertiesModel } from "./fabricProperties/GetFabricProperties"
import { upsertPreferedFabricPropertiesModel } from "./fabricProperties/UpsertFabricProperties"
import { getFitPreferencesModel } from "./fitPreferences/GetFitPreferences"
import { upsertFitPreferencesModel } from "./fitPreferences/UpsertFitPreferences"
import { createPaymentModel } from "./paymentMethods/CreatePayment"
import { createPaymentMethodModel } from "./paymentMethods/CreatePaymentMethod"
import { getAllPaymentMethodsModel } from "./paymentMethods/GetAllPaymentMethods"
import { getDefaultPaymentMethodModel } from "./paymentMethods/GetDefaultPaymentMethod"
import { createReturnModel } from "./returns/CreateReturn"
import { getReturnModel } from "./returns/GetReturn"
import { activeSalesOrderModel } from "./salesOrders/ActiveSalesOrder"
import { buyAllLineItemsModel } from "./salesOrders/BuyAllLineItems"
import { createFirstOrderModel } from "./salesOrders/CreateFirstOrder"
import { addOrUpdateFeedbackModel } from "./salesOrders/Feedback"
import { salesOrderDetailsModel } from "./salesOrders/SalesOrderDetails"
import { salesOrdersQueryModel } from "./salesOrders/SalesOrdersQuery"
import { updateAdditionalRequestsModel } from "./salesOrders/UpdateAdditionalRequests"
import { updateEstimatedDeliveryDateModel } from "./salesOrders/UpdateEstimatedDeliveryDate"
import { updateSalesOrderAddressModel } from "./salesOrders/UpdateSalesOrderAddress"
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
  getAllAddressesModel: typeof getAllAddressesModel,
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
  buyAllLineItemsModel: typeof buyAllLineItemsModel,
  getDefaultPaymentMethodModel: typeof getDefaultPaymentMethodModel,
  getReturnModel: typeof getReturnModel,
  createReturnModel: typeof createReturnModel,
  getBlogMetaDataModel: typeof getBlogMetaDataModel,
  createPaymentModel: typeof createPaymentModel,
  createFirstOrderModel: typeof createFirstOrderModel,
  updateSalesOrderAddressModel: typeof updateSalesOrderAddressModel,
  updateEstimatedDeliveryDateModel: typeof updateEstimatedDeliveryDateModel,
  updateAdditionalRequestsModel: typeof updateAdditionalRequestsModel,
  getAllPaymentMethodsModel: typeof getAllPaymentMethodsModel,
  changeDefaultAddressModel: typeof changeDefaultAddressModel,
  getAddressModel: typeof getAddressModel,
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
  getAllAddressesModel,
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
  buyAllLineItemsModel,
  getDefaultPaymentMethodModel,
  getReturnModel,
  createReturnModel,
  getBlogMetaDataModel,
  createPaymentModel,
  createFirstOrderModel,
  updateSalesOrderAddressModel,
  updateEstimatedDeliveryDateModel,
  updateAdditionalRequestsModel,
  getAllPaymentMethodsModel,
  changeDefaultAddressModel,
  getAddressModel,
}