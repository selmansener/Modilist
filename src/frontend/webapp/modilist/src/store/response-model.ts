export interface ResponseModel<T> {
    isBusy: boolean | undefined;
    response: T;
}