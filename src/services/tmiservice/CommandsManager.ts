import CommandBase from './commands/CommandBase';
import BedLightCommand from './commands/BedLightCommand';
import HACommandBase from './commands/HACommandBase';
import BotConfig from '../../objects/BotConfig';
import CommandResponse from './CommandResponse';
import SayHiBotCommand from './commands/SayHiBotCommand';
import TopLightCommand from './commands/TopLightCommand';
import DiscoCommand from './commands/DiscoCommand';

export default class CommandsManager {

    private conf: BotConfig;

    constructor(config: BotConfig) {
        this.conf = config;
        new BedLightCommand();
        new SayHiBotCommand();
        new TopLightCommand();
        new DiscoCommand();
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