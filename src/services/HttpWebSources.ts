import http, { Server, IncomingMessage, ServerResponse } from "http";
import fs from "fs";

export default class HttpWebSources {
    private port: number;
    private server: Server | undefined;

    constructor(port: number = 8181) {
        this.port = port;
    }
    public start(): void {
        console.log("http server creating");
        this.server = http.createServer(this.requestListener).listen(8182);
        this.server.addListener
    }

    private requestListener(req: IncomingMessage, res: ServerResponse): void {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
    }
}