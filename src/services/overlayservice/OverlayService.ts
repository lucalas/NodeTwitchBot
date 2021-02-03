import http, { Server, IncomingMessage, ServerResponse } from "http";
import HeartbeatWebSource from "./heartbeat/HeartbeatOverlay";
import TestWebSource from "./TestOverlay";
import OverlayBase from "./OverlayBase";

export default class OverlayService {
    private port: number;
    private server: Server | undefined;

    constructor(port: number = 8182) {
        this.port = port;
        new HeartbeatWebSource();
        new TestWebSource();
    }

    public start(): void {
        console.log("http server creating");
        this.server = http.createServer(this.requestListener.bind(this)).listen(this.port);
    }

    private requestListener(req: IncomingMessage, res: ServerResponse): void {
        let webSource: OverlayBase = OverlayBase.webSources.get(req.url!)!;
        if (webSource !== undefined && webSource !== null && webSource.getUrl() === req.url) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(webSource.getWebPage());
            res.end();
        }
    }
}

export class WebSource {
    public webPage: String = "";
    public url: string = "";
}