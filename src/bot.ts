import BotConfig from './objects/BotConfig';
import WebSocketServer from './services/websocketservice/WebSocketService';
import TmiService from './services/tmiservice/TmiService';
import OverlayService from './services/overlayservice/OverlayService';

export default class Bot {
  private tmiService: TmiService;
  private config: BotConfig = BotConfig.getConfig();
  private webSocket: WebSocketServer;
  private overlayService: OverlayService;

  constructor() {
    this.tmiService = new TmiService(this.config);
    this.tmiService.start();

    this.webSocket = new WebSocketServer();
    this.webSocket.start();

    this.overlayService = new OverlayService();
    this.overlayService.start();
  }
}