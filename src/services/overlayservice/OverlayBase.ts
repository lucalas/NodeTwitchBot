export default abstract class OverlayBase {
    public static webSources: Map<String, OverlayBase> = new Map();

    constructor() {
        if (!OverlayBase.webSources.has(this.getUrl())) {
            OverlayBase.webSources.set(this.getUrl(), this);
        }
    }

    public abstract getWebPage(): string;
    public abstract getUrl(): string;
}