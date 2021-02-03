import WebSourceBase from "./WebSourceBase";

export default class TestWebSource extends WebSourceBase {
    public getWebPage(): string {
        return "<h1>Test page</h1>";
    }
    public getUrl(): string {
        return "/test";
    }
}