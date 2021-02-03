import OverlayBase from "./OverlayBase";

export default class TestWebSource extends OverlayBase {
    public getWebPage(): string {
        return "<h1>Test page</h1>";
    }
    public getUrl(): string {
        return "/test";
    }
}