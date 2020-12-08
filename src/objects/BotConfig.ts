import * as config from '../config.json';

export default class BotConfig {
    public channel_name: string = "";
    public oauth_token: string = "";
    public bot_username: string = "";
    public ha_token: string = "";

    public static getConfig(): BotConfig {
        return config;
    }
}