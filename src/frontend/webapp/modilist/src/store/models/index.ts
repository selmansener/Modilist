// @filename: models.ts
import { Models } from "@rematch/core"
import { createProduct } from "./CreateProduct"
 
export interface RootModel extends Models<RootModel> {
  createProduct: typeof createProduct
}
 
export const models: RootModel = { createProduct }