import { Context } from "@fivethree/billy-core";
import { Plugins } from "./plugins";
export declare class Wach extends Plugins {
    enable(context: Context): Promise<void>;
    disable(context: Context): Promise<void>;
    report(): Promise<void>;
    isEnabled(): Promise<boolean>;
    getStatus(): Promise<any>;
}
