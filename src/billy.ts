import { App, Lane, LaneContext, context } from "@fivethree/billy-core";
import { Application } from "./generated/application";

@App()
export class Wach extends Application {

    @Lane('prevent your mac from going to sleep! ☕')
    async enable(@context() context: LaneContext) {
        const enabled = await this.isEnabled();
        if (!enabled) {
            const status = await this.getStatus();
            await this.writeJSON(context.directory + '/config.json', status);
            await this.exec('sudo pmset -a sleep 0');
            await this.exec('sudo pmset -a hibernatemode 0');
            await this.exec('sudo pmset -a disablesleep 1');
            this.print('your mac will be wide awake! ☕');
        } else {
            this.print('already enabled');
        }

    }

    @Lane('disable sleep prevention!💤')
    async disable(@context() context: LaneContext) {
        const enabled = await this.isEnabled();
        if (enabled) {
            const status = await this.parseJSON(context.directory + '/config.json');
            const sleep = status.sleep | 1;
            await this.exec('sudo pmset -a sleep ' + sleep);
            const hibernate = status.hibernatemode | 3;
            await this.exec('sudo pmset -a hibernatemode ' + hibernate);
            await this.exec('sudo pmset -a disablesleep 0');
            this.print('turned off sleep prevention - your mac can rest now! 🛏');
        } else {
            this.print('sleep prevention is not active at the moment');
        }
    }

    @Lane('get report of power management settings. 🔋')
    async report() {
        const status = await this.getStatus();
        this.print(JSON.stringify(status, null, 4).replace(/[{}]/g, ''));
    }

    async isEnabled() {
        const status = await this.getStatus();
        return status.sleep && status.sleep === '0'
            && status.hibernatemode && status.hibernatemode === '0';
    }

    async getStatus() {
        const sleep = await this.exec(`pmset -g`);
        const array: string[] = sleep.stdout
            .substring(sleep.stdout.lastIndexOf(':') + 1, sleep.stdout.length)
            .replace(/ *\([^)]*\) */g, '')
            .replace(/(?:\n)/g, '')
            .split(' ')
            .filter(e => e !== '');
        const json: any = {};
        for (let i = 0; i < array.length; i += 2) {
            json[array[i]] = array[i + 1];
        }
        return json;
    }

}
