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

    private receiver: Array<connection> = new Array();
    private sender: Array<connection> = new Array();

    public addReceiver(receiver: connection): void {
        this.receiver.push(receiver);
    }

    public addSender(sender: connection): void {
        this.sender.push(sender);
        // TODO check if utf8Data is not null
        sender.on("message", data => this.consumeData(JSON.parse(data.utf8Data!) as T))
    }

    public getSender(): Array<connection> {
        return this.sender;
    }

    public getReceiver(): Array<connection> {
        return this.receiver;
    }

    public getSenderType(): string {
        return this.senderType;
    }

    public getReceiverType(): string {
        return this.receiverType;
    }

    private consumeData(data: T): void {
        this.receiver.forEach(rcv => rcv.send(JSON.stringify(data)));
    }
}