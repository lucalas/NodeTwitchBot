export default class CommandResponse {
    public textResponse: string = "";
    public error: string = "";

    public success(): boolean {
        return this.error == undefined || this.error == null || this.error == "";
    }

    public response(): boolean {
        return this.textResponse != undefined && this.textResponse != null && this.textResponse != "";
    }
}