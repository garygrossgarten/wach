
import { CorePlugin } from '@fivethree/billy-plugin-core';
import { usesPlugins } from '@fivethree/billy-core';

//we need this line for intellisense :)
export interface Plugins extends CorePlugin {}

export class Plugins {
    @usesPlugins(CorePlugin) this;
}
        