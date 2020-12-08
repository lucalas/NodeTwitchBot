import axios from 'axios';
import HACommandBase from './HACommandBase';
import CommandsManager from './CommandsManager';

export default class LightCommand extends HACommandBase<LightCommandOpts> {
    protected command: string = "!light";

    protected getArgs(args?: Array<string>): LightCommandOpts {
        let lightArgs = new LightCommandOpts();
        lightArgs.color = args![0];
        lightArgs.token = args![1];
        return lightArgs;
    }

    protected run(args: LightCommandOpts): void {
        axios.post( 
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
        // FIXME gestire il ritorno e restituire un errore al mittente
        // se qualcosa e' andato storto (es. colore sbagliato)
        //.then(console.log)
        .catch(console.log);
    }

}

class LightCommandOpts {
    public color: string = "";
    public token: string = "";
}