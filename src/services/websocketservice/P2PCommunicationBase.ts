import {connection} from "websocket";

export default abstract class P2PCommunicationBase<T> {
    public static P2PCommunications: Array<P2PCommunicationBase<Object>> = new Array();

    constructor() {
        if (!P2PCommunicationBase.P2PCommunications.some(P2PCommunication => this.senderType === P2PCommunication.senderType)) {
            P2PCommunicationBase.P2PCommunications.push(this);
        }
    }

    protected abstract senderType: string;
    protected abstract receiverType: string;

    private receiver: connection | undefined;
    private sender: connection | undefined;

    public setReceiver(receiver: connection): void {
        this.receiver = receiver;
    }

    public setSender(sender: connection): void {
        this.sender = sender;
        // TODO check if utf8Data is not null
        this.sender.on("message", data => this.consumeData(JSON.parse(data.utf8Data!) as T))
    }

    public getSender(): connection {
        return this.sender!;
    }

    public getReceiver(): connection {
        return this.receiver!;
    }

    public getSenderType(): string {
        return this.senderType;
    }

    public getReceiverType(): string {
        return this.receiverType;
    }

    private consumeData(data: T): void {
        this.receiver?.send(JSON.stringify(data));
    }
}