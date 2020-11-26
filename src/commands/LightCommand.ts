import axios from 'axios';
import ICommand from './ICommand';

export default class LightCommand implements ICommand<LightCommandOpts> {

    private command: string = "!light";

    public getCommand(): string {
        return this.command;
    }

    execute(args: LightCommandOpts): void {
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