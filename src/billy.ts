import { App, Lane } from "@fivethree/billy-core";
import { Application } from "./generated/application";

@App()
export class Wach extends Application {

    @Lane('prevent your mac from going to sleep! ☕')
    async enable() {
        await this.exec('sudo pmset -a sleep 0');
        await this.exec('sudo pmset -a hibernatemode 0');
        await this.exec('sudo pmset -a disablesleep 1');
        this.print('your mac will be wide awake! ☕');
    }

    @Lane('disable sleep prevention!💤')
    async disable() {
        await this.exec('sudo pmset -a sleep 1');
        await this.exec('sudo pmset -a hibernatemode 3');
        await this.exec('sudo pmset -a disablesleep 0');
        this.print('turned off sleep prevention - your mac can rest now! 🛏');
    }

}
