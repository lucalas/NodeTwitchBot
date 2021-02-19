import axios, { AxiosResponse } from 'axios';
import HACommandBase from './HACommandBase';
import CommandResponse from '../CommandResponse';

export default class DiscoCommand extends HACommandBase<LightCommandOpts> {

    private maxChanges: number = 30;
    private current: number = 0;
    protected command: string = "!disco";
    private colorList: Array<string> = ['white', 'blue', 'red', 'green', 'yellow', 'purple', 'orange'];
    private on: boolean = true;
    private changeDelay: number = 100;

    protected getArgs(args?: Array<string>): LightCommandOpts {
        let lightArgs = new LightCommandOpts();
        lightArgs.token = args![0];
        return lightArgs;
    }

    protected async run(args: LightCommandOpts): Promise<CommandResponse> {
        try {
            console.log("running disco");
            if (this.current == 0) {
                this.current++;
                setTimeout(() => {this.changeLight(this.colorList[Math.floor(Math.random() * (this.colorList.length - 0)) + 0], args.token)}, this.changeDelay);
            }
        } catch (ex) {
            // TODO error
        }

        let rsp: CommandResponse = this.getSuccessResponse();
        
        return rsp;
    }

    private changeLight(color: string, token: string): void {
        let res: Promise<AxiosResponse> | undefined;
        if (this.on) {
            res = axios.post(
                'http://hassio:8123/api/services/light/turn_off',
                {
                    'entity_id': 'light.soffitto'
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
        } else {
            res = axios.post(
                'http://hassio:8123/api/services/light/turn_on',
                {
                    'entity_id': 'light.soffitto',
                    'color_name': color
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
        }
        this.on = !this.on;
        res?.then(res => {
            this.current++;
            if (this.current < this.maxChanges || !this.on) {
                setTimeout(() => {this.changeLight(this.colorList[Math.floor(Math.random() * (this.colorList.length - 0)) + 0], token)}, this.changeDelay);
            } else {
                this.current = 0;
            }
        });
    }

}

class LightCommandOpts {
    public color: string = "";
    public token: string = "";
}