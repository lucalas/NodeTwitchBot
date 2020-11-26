import * as config from './config.json';
import tmi, {Client, Options} from 'tmi.js';
import LightCommand from './commands/LightCommand';

export default class Bot {
    private tmiClient: Client | undefined;

    private tmiOptions: Options = {
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

    constructor() {
    }

    /**
     * Initialize bot, creating tmi client connection and events.
     */
    public init() {
        this.tmiClient = tmi.client(this.tmiOptions);
        this.tmiClient.on('connected', this.onConnected);
        this.tmiClient.on('message', this.onMessage);

        this.tmiClient.connect()
                .catch(console.error);
    }

    private onConnected(address: string, port: number) {
        console.log(`* Connected to ${address}:${port}`);
    }

    private onMessage(channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) {
        // TODO 
        // Create logic to manage commands based on ICommand
    }
}