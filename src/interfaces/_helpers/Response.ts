export default interface IResponse {
    success: boolean;
    errors?: any;
    details?: any;
    [key: string]: any;
}
