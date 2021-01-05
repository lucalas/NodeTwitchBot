import http from "http";
import {server} from "websocket";

export default class CustomWebSocketServer {
    private port: number;
    private server: server | undefined;

    constructor(port: number = 8181) {
        this.port = port;
    }

    public start(): void {
        console.log("server creating");
        this.server = new server({ httpServer: http.createServer().listen(8181) });
        this.server.on('request', request => {
            const connection = request.accept(undefined, request.origin);
            connection.on('message', function(message) {
                console.log('Received Message:', message.utf8Data);
                //connection.sendUTF('Hi this is WebSocket server!');
            });
        });
    }
}