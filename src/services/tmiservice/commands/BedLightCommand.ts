import axios, { AxiosResponse } from 'axios';
import HACommandBase from './HACommandBase';
import CommandResponse from '../CommandResponse';

export default class BedLightCommand extends HACommandBase<LightCommandOpts> {
    protected command: string = "!bedlight";

    protected getArgs(args?: Array<string>): LightCommandOpts {
        let lightArgs = new LightCommandOpts();
        lightArgs.color = args![0];
        lightArgs.token = args![1];
        return lightArgs;
    }

    protected async run(args: LightCommandOpts): Promise<CommandResponse> {
        try {
            let resp: AxiosResponse = await axios.post(
                'http://hassio:8123/api/services/light/turn_on',
                {
                    'entity_id': 'light.letto',
                    'color_name': args.color
                },
                {
                    headers: {
                        Authorization: `Bearer ${args.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
        } catch (ex) {
            // TODO error
        }

        let rsp: CommandResponse = this.getSuccessResponse();

        if (args.color === "black") {
            rsp.textResponse = "Accendermi di nero ti fara' cadere nell'oblio" ;
        }
        
        return rsp;
    }

}

class LightCommandOpts {
    public color: string = "";
    public token: string = "";
}