import tmi, { Client, Options } from 'tmi.js';
import CommandsManager from './CommandsManager';
import BotConfig from '../../objects/BotConfig';
import CommandResponse from './CommandResponse';

export default class TmiService {
    private config: BotConfig;
    private tmiClient: Client;
    private tmiOptions: Options;
    private commandsManager: CommandsManager;

    constructor(config: BotConfig) {
        this.config = config;

        this.tmiOptions = {
            options: { debug: true },
            connection: {
              reconnect: true,
              secure: true
            },
            identity: {
              username: config.bot_username,
              password: config.oauth_token
            },
            channels: [
              config.channel_name
            ]
          };

        this.tmiClient = tmi.client(this.tmiOptions);
        this.tmiClient.on('connected', this.onConnected.bind(this));
        this.tmiClient.on('message', this.onMessage.bind(this));

        this.commandsManager = new CommandsManager(this.config);
    }

    public start() {
        this.tmiClient.connect()
            .catch(console.error);
    }

    private onConnected(address: string, port: number) {
        console.log(`* Connected to ${address}:${port}`);
    }
    
    private async onMessage(channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) {
        let response: CommandResponse | undefined = await this.commandsManager.manageRequest(message);

        if (response != undefined && response.success() && response.response()) {
            this.tmiClient.say(channel, response.textResponse);
        }
    }
}