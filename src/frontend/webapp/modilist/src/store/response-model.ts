export type Dictonary = { [key: string]: string[] }[]

export interface ResponseModel<T> {
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