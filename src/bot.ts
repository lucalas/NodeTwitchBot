import BotConfig from './objects/BotConfig';
import WebSocketServer from './services/websocketservice/WebSocketService';
import TmiService from './services/tmiservice/TmiService';
import HttpWebSources from './services/websources/HttpWebSourcesService';

export default class Bot {
  private tmiService: TmiService;
  private config: BotConfig = BotConfig.getConfig();
  private webSocket: WebSocketServer;
  private httpServer: HttpWebSources;

  constructor() {
    this.tmiService = new TmiService(this.config);
    this.tmiService.start();

    this.webSocket = new WebSocketServer();
    this.webSocket.start();

    this.httpServer = new HttpWebSources()
    this.httpServer.start();
  }
}