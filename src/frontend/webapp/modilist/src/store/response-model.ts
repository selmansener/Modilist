export type Dictonary = { [key: string]: string[] }[]

export interface ResponseModel<T = void> {
    isBusy: boolean;
    data?: T;
    message?: string;
    errors?: Dictonary;
    errorType?: string;
    status?: number
}

export interface ErrorResponse {
    message?: string;
    errors?: Dictonary;
    errorType?: string;
}

export interface DQBResultDTO<T> {
    data: T[],
    count: number,
}

export function isResponseModel(object: any): object is ResponseModel {

    return 'data' in object || 'status' in object || 'errors' in object || 'errorType' in object;
}