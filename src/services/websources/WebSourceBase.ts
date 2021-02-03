export default abstract class WebSourceBase {
    public static webSources: Map<String, WebSourceBase> = new Map();

    constructor() {
        if (!WebSourceBase.webSources.has(this.getUrl())) {
            WebSourceBase.webSources.set(this.getUrl(), this);
        }
    }

    public abstract getWebPage(): string;
    public abstract getUrl(): string;
}