
import P2PCommunicationBase from "../P2PCommunicationBase";

export default class HeartbeatP2P extends P2PCommunicationBase<any> {
    protected senderType: string = "send_heartbeat";
    protected receiverType: string = "get_heartbeat";

}