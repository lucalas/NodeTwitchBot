export default abstract class CommandBase<T> {
    public static commands: Array<CommandBase<Object>> = new Array();

    constructor() {
        if (!CommandBase.commands.some(command => this.command === command.command)) {
            CommandBase.commands.push(this);
        }
    }

    protected abstract command: string;

    protected abstract run(args?: T): void;
    protected abstract getArgs(args?: Array<string>): T;

    public execute(args?: Array<string>): void {
        this.run(this.getArgs(args));
    }

    public checkCommand(command: string): boolean {
        return command.includes(this.command);
    }

    public getArguments(command: string): Array<string> {
        return command.split(" ").slice(1);
    }
}