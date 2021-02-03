import http from "http";
import {server} from "websocket";

export default class CustomWebSocketServer {
    private port: number;
    private server: server | undefined;

    constructor(port: number = 8181) {
        this.port = port;
    }

    public start(): void {
        console.log("websocket server creating");
        this.server = new server({ httpServer: http.createServer().listen(8181) });
        this.server.on('request', request => {
            let connection = request.accept(undefined, request.origin);
            connection.on("message", data => {
                // TODO change this method used for testing heartbeat
                if (JSON.parse(data.utf8Data!).type === "heartbeat") {
                    let a = 0;
                    setInterval(() => {
                        connection.send(a)  ;
                        a++;
                      }, 1000);
                }
                console.log("Received Message:", data.utf8Data);
                //connection.sendUTF('Hi this is WebSocket server!');
            });
        });
    }
}