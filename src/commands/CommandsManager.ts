import CommandBase from './CommandBase';
import LightCommand from './LightCommand';
import HACommandBase from './HACommandBase';
import BotConfig from '../objects/BotConfig';

export default class CommandsManager {

    private conf: BotConfig;

    constructor(config: BotConfig) {
        this.conf = config;
        new LightCommand();
    }

    public manageRequest(message: string) {
        let command: CommandBase<Object> | undefined = CommandBase.commands.find(command => command.checkCommand(message));
        let args: Array<string> | undefined = command?.getArguments(message);
        if (command instanceof HACommandBase) {
            args![args!.length] = this.conf.ha_token;
        }
        command?.execute(args);
    }
}