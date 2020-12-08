import CommandBase from "./CommandBase";
import CommandResponse from "../objects/CommandResponse";

export default class SayHiBotCommand extends CommandBase<SayHiBot> {
    protected command: string = "!sayhi";
    protected async run(args?: SayHiBot | undefined): Promise<CommandResponse> {
        let resp: CommandResponse = this.getSuccessResponse();
        resp.textResponse = "Ciao a tutti, sono bot fatto in Node!";
        return resp;
    }
    protected getArgs(args: string[]): SayHiBot {
        let conf: SayHiBot = new SayHiBot();
        conf.username = args[0];
        return conf;
    }

}

class SayHiBot {
    public username: string = "";
}