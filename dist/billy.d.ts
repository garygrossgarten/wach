import { LaneContext } from "@fivethree/billy-core";
import { Application } from "./generated/application";
export declare class Wach extends Application {
    enable(context: LaneContext): Promise<void>;
    disable(context: LaneContext): Promise<void>;
    report(): Promise<void>;
    isEnabled(): Promise<boolean>;
    getStatus(): Promise<any>;
}
