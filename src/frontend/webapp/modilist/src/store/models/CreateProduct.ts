import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { api } from "../..";
import { CreateProductInputDTO } from "../../services/swagger/api";


export const createProduct = createModel<RootModel>()({
    state: {
        sku: "",
        name: ""
    } as CreateProductInputDTO,
    reducers: {
        CREATE_PRODUCT: (state: CreateProductInputDTO, sku: string, name: string) => {
            return {
                ...state,
                sku,
                name
            }
        },
    },
    effects: (dispatch) => {
        const { createProduct } = dispatch
        return {
            async createProduct(input: CreateProductInputDTO): Promise<any> {
                const response = await api.test.apiV1TestPost({
                    sku: input.sku ?? "",
                    name: input.name ?? ""
                });
                
                createProduct.CREATE_PRODUCT(response.data.sku, response.data.name)
            },
        }
    }
});