import BotConfig from './objects/BotConfig';
import WebSocketService from './services/websocketservice/WebSocketService';
import TmiService from './services/tmiservice/TmiService';
import OverlayService from './services/overlayservice/OverlayService';

export default class Bot {
  private tmiService: TmiService;
  private config: BotConfig = BotConfig.getConfig();
  private webSocket: WebSocketService;
  private overlayService: OverlayService;

  constructor() {
    this.tmiService = new TmiService(this.config);
    this.tmiService.start();

    this.webSocket = new WebSocketService();
    this.webSocket.start();

    this.overlayService = new OverlayService();
    this.overlayService.start();
  }
}