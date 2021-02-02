import WebSourceBase from "../WebSourceBase";
import fs from 'fs';

export default class HeartbeatWebSource extends WebSourceBase {
    private heartbeat: number = 5;

    public getWebPage(): string {
        let data: Buffer = fs.readFileSync("./src/WebSources/Heartbeat/index.html");
        let page: string = data.toString("utf-8");
        page = page.replace("${heartbeat}", this.heartbeat.toString());
        return page;
    }

    public getUrl(): string {
        return "/heartbeat";
    }
}