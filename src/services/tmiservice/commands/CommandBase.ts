import CommandResponse from "../CommandResponse";

export default abstract class CommandBase<T> {
    public static commands: Array<CommandBase<Object>> = new Array();

    constructor() {
        if (!CommandBase.commands.some(command => this.command === command.command)) {
            CommandBase.commands.push(this);
        }
    }

    protected abstract command: string;

    protected abstract run(args?: T): Promise<CommandResponse>;
    protected abstract getArgs(args?: Array<string>): T;

    public execute(args?: Array<string>): Promise<CommandResponse> {
        return this.run(this.getArgs(args));
    }

    public checkCommand(command: string): boolean {
        return command.indexOf(this.command) > -1;
    }

    public getArguments(command: string): Array<string> {
        return command.split(" ").slice(1);
    }

    protected getSuccessResponse(): CommandResponse {
        return new CommandResponse();
    }
}