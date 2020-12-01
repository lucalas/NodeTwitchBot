import CommandBase from './CommandBase';
import LightCommand from './LightCommand';

export default class CommandsManager {

    public manageRequest(message: string) {
        let command: CommandBase<Object> | undefined = CommandBase.commands.find(command =>  command.checkCommand(message));
        command?.execute();
    }
}