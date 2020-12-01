export default abstract class CommandBase<T> {
    public static commands: Array<CommandBase<Object>> = new Array();

    constructor() {
        if(!CommandBase.commands.some(command => this.getCommand() === command.getCommand())) {
            CommandBase.commands.push(this);
        }
    }
    
    public abstract getCommand(): string;
    public abstract execute(args?: T): void;

    public checkCommand(command: string): boolean {
        return command.includes(this.getCommand());
    }
}