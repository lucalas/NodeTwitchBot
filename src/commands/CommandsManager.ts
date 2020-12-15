import CommandBase from './CommandBase';
import BedLightCommand from './BedLightCommand';
import HACommandBase from './HACommandBase';
import BotConfig from '../objects/BotConfig';
import CommandResponse from '../objects/CommandResponse';
import SayHiBotCommand from './SayHiBotCommand';
import TopLightCommand from './TopLightCommand';

export default class CommandsManager {

    private conf: BotConfig;

    constructor(config: BotConfig) {
        this.conf = config;
        new BedLightCommand();
        new SayHiBotCommand();
        new TopLightCommand();
    }

    public async manageRequest(message: string): Promise<CommandResponse | undefined> {
        let command: CommandBase<Object> | undefined = CommandBase.commands.find(command => command.checkCommand(message));
        let args: Array<string> | undefined = command?.getArguments(message);
        if (command instanceof HACommandBase) {
            args![args!.length] = this.conf.ha_token;
        }
        return command?.execute(args);
    }
}