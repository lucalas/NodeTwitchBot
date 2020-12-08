import tmi, { Client, Options } from 'tmi.js';
import CommandsManager from './commands/CommandsManager';
import BotConfig from './objects/BotConfig';
import CommandResponse from './objects/CommandResponse';

export default class Bot {
  private tmiClient: Client | undefined;
  private commandsManager: CommandsManager | undefined;
  private config: BotConfig = BotConfig.getConfig();

  private tmiOptions: Options = {
    options: { debug: true },
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: this.config.bot_username,
      password: this.config.oauth_token
    },
    channels: [
      this.config.channel_name
    ]
  };

  constructor() {
  }

  /**
   * Initialize bot, creating tmi client connection and events.
   */
  public init() {
    this.commandsManager = new CommandsManager(this.config);

    this.tmiClient = tmi.client(this.tmiOptions);
    this.tmiClient.on('connected', this.onConnected.bind(this));
    this.tmiClient.on('message', this.onMessage.bind(this));

    this.tmiClient.connect()
      .catch(console.error);
  }

  private onConnected(address: string, port: number) {
    console.log(`* Connected to ${address}:${port}`);
  }

  private async onMessage(channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) {
    let response: CommandResponse | undefined = await this.commandsManager!.manageRequest(message);

    if (response != undefined && response.success() && response.response()) {
      this.tmiClient!.say(channel, response.textResponse);
    }
  }
}