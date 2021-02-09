import http from "http";
import {server, connection} from "websocket";
import P2PCommunicationBase from "./P2PCommunicationBase";
import HeartbeatP2P from "./P2PCommunications/HeartbeatP2P";

export default class WebSocketService {
    private port: number;
    private server: server | undefined;

    constructor(port: number = 8181) {
        this.port = port;
        new HeartbeatP2P();
    }

    public start(): void {
        console.log("websocket server creating");
        this.server = new server({ httpServer: http.createServer().listen(8181) });
        this.server.on('request', request => {
            let connection: connection = request.accept(undefined, request.origin);
            connection.on("message", data => {
                const object: any = JSON.parse(data.utf8Data!);
                const handlerSender: P2PCommunicationBase<any> = this.getP2PHandlerSender(object.type);
                if (handlerSender) {
                    if (!handlerSender.getSender()) {
                        handlerSender.setSender(connection);
                    }
                    return;
                }

                const handlerReceiver: P2PCommunicationBase<any> = this.getP2PHandlerReceiver(object.type);                
                if (handlerReceiver) {
                    if (!handlerReceiver.getReceiver()) {
                        handlerReceiver.setReceiver(connection);
                    }
                    return;
                }

                console.log("Received unknown message:", data.utf8Data);
                //connection.sendUTF('Hi this is WebSocket server!');
            });
        });
    }

    private getP2PHandlerSender(type: string): P2PCommunicationBase<Object> {
        return P2PCommunicationBase.P2PCommunications.find(p2p => p2p.getSenderType() === type)!;
    }

    private getP2PHandlerReceiver(type: string): P2PCommunicationBase<Object> {
        return P2PCommunicationBase.P2PCommunications.find(p2p => p2p.getReceiverType() === type)!;
    }
}