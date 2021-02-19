import axios, { AxiosResponse } from 'axios';
import HACommandBase from './HACommandBase';
import CommandResponse from '../CommandResponse';

export default class DiscoCommand extends HACommandBase<LightCommandOpts> {

    private maxChanges: number = 30;
    private current: number = 0;
    protected command: string = "!disco";
    private colorList: Array<string> = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgree'];

    protected getArgs(args?: Array<string>): LightCommandOpts {
        let lightArgs = new LightCommandOpts();
        lightArgs.token = args![0];
        return lightArgs;
    }

    protected async run(args: LightCommandOpts): Promise<CommandResponse> {
        try {
            if (this.current == 0) {
                setTimeout(() => {this.changeLight(this.colorList[Math.floor(Math.random() * (this.colorList.length - 0)) + 0], args.token)}, 500);
            }
        } catch (ex) {
            // TODO error
        }

        let rsp: CommandResponse = this.getSuccessResponse();
        
        return rsp;
    }

    private changeLight(color: string, token: string): void {
        axios.post(
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
            }
        ).then(res => {
            this.current++;
            if (this.current < this.maxChanges) {
                setTimeout(() => {this.changeLight(this.colorList[Math.floor(Math.random() * (this.colorList.length - 0)) + 0], token)}, 200);
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