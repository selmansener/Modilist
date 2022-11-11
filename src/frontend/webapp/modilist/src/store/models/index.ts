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
import { sendJobApplicationMailModel } from "./careers/SendJobApplicationMail"
import { sendInvitationEmailsModel } from "./discounts/SendInvitationEmails"
import { getPreferedFabricPropertiesModel } from "./fabricProperties/GetFabricProperties"
import { upsertPreferedFabricPropertiesModel } from "./fabricProperties/UpsertFabricProperties"
import { getFitPreferencesModel } from "./fitPreferences/GetFitPreferences"
import { upsertFitPreferencesModel } from "./fitPreferences/UpsertFitPreferences"
import { sendPartnershipMailModel } from "./partnership/SendPartnershipMail"
import { createPaymentModel } from "./paymentMethods/CreatePayment"
import { createDefaultPaymentMethodModel } from "./paymentMethods/CreateDefaultPaymentMethod"
import { getAllPaymentMethodsModel } from "./paymentMethods/GetAllPaymentMethods"
import { getDefaultPaymentMethodModel } from "./paymentMethods/GetDefaultPaymentMethod"
import { createReturnModel } from "./returns/CreateReturn"
import { getReturnModel } from "./returns/GetReturn"
import { activeSalesOrderModel } from "./salesOrders/ActiveSalesOrder"
import { buyAllLineItemsModel } from "./salesOrders/BuyAllLineItems"
import { addOrUpdateFeedbackModel } from "./salesOrders/Feedback"
import { salesOrderDetailsModel } from "./salesOrders/SalesOrderDetails"
import { salesOrdersQueryModel } from "./salesOrders/SalesOrdersQuery"
import { updateAdditionalRequestsModel } from "./salesOrders/UpdateAdditionalRequests"
import { updateEstimatedDeliveryDateModel } from "./salesOrders/UpdateEstimatedDeliveryDate"
import { updateRequestedStyleModel } from "./salesOrders/UpdateRequestedStyle"
import { updateSalesOrderAddressModel } from "./salesOrders/UpdateSalesOrderAddress"
import { getSizeInfoModel } from "./sizeInfo/GetSizeInfo"
import { upsertSizeInfoModel } from "./sizeInfo/UpsertSizeInfo"
import { getStylePreferencesModel } from "./stylePreferences/GetStylePreferences"
import { upsertStylePreferencesModel } from "./stylePreferences/UpsertStylePreferences"
import { activateSubscriptionModel } from "./subscriptions/ActivateSubscription"
import { createSubscriptionModel } from "./subscriptions/CreateSubscription"
import { getSubscriptionModel } from "./subscriptions/GetSubscription"
import { suspendSubscriptionModel } from "./subscriptions/SuspendSubscription"
import { updateSubscriptionModel } from "./subscriptions/UpdateSubscription"
import { activateAccountModel } from "./users/ActivateAccount"
import { createAccountModel } from "./users/CreateAccount"
import { getAccountModel } from "./users/GetAccount"
import { updateAccountModel } from "./users/UpdateAccount"
import { stepperSubscription } from "./welcome/StepperSubscription"
import { welcomePageStepper } from "./welcome/WelcomePageStepper"
import { sendContactFormModel } from "./contact/SendContactForm"
import { createNewPaymentMethodModel } from "./paymentMethods/CreateNewPaymentMethod"
import { changeDefaultPaymentMethodModel } from "./paymentMethods/ChangeDefaultPaymentMethod"

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
  updateSubscriptionModel: typeof updateSubscriptionModel,
  suspendSubscriptionModel: typeof suspendSubscriptionModel,
  activateSubscriptionModel: typeof activateSubscriptionModel,
  createDefaultPaymentMethodModel: typeof createDefaultPaymentMethodModel,
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
  updateSalesOrderAddressModel: typeof updateSalesOrderAddressModel,
  updateEstimatedDeliveryDateModel: typeof updateEstimatedDeliveryDateModel,
  updateAdditionalRequestsModel: typeof updateAdditionalRequestsModel,
  getAllPaymentMethodsModel: typeof getAllPaymentMethodsModel,
  changeDefaultAddressModel: typeof changeDefaultAddressModel,
  getAddressModel: typeof getAddressModel,
  sendPartnershipMailModel: typeof sendPartnershipMailModel,
  sendJobApplicationMailModel: typeof sendJobApplicationMailModel,
  sendContactFormModel: typeof sendContactFormModel
  updateRequestedStyleModel: typeof updateRequestedStyleModel,
  sendInvitationEmailsModel: typeof sendInvitationEmailsModel,
  createNewPaymentMethodModel: typeof createNewPaymentMethodModel,
  changeDefaultPaymentMethodModel: typeof changeDefaultPaymentMethodModel
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
  updateSubscriptionModel,
  suspendSubscriptionModel,
  activateSubscriptionModel,
  createDefaultPaymentMethodModel,
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
  updateSalesOrderAddressModel,
  updateEstimatedDeliveryDateModel,
  updateAdditionalRequestsModel,
  getAllPaymentMethodsModel,
  changeDefaultAddressModel,
  getAddressModel,
  sendPartnershipMailModel,
  sendJobApplicationMailModel,
  sendContactFormModel,
  updateRequestedStyleModel,
  sendInvitationEmailsModel,
  createNewPaymentMethodModel,
  changeDefaultPaymentMethodModel
}