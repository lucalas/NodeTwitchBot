import OverlayBase from "../OverlayBase";
import fs from 'fs';

export default class HeartbeatWebSource extends OverlayBase {
    private heartbeat: number = 5;

    public getWebPage(): string {
        let data: Buffer = fs.readFileSync("./src/web-public/overlays/heartbeat/index.html");
        let page: string = data.toString("utf-8");
        page = page.replace("${heartbeat}", this.heartbeat.toString());
        return page;
    }

    public getUrl(): string {
        return "/heartbeat";
    }
}