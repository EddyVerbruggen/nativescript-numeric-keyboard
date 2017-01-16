import { NumericKeyboardApi, NumericKeyboardOptions } from "./numeric-keyboard.common";
import { TextView } from "ui/text-view";
export declare class NumericKeyboard implements NumericKeyboardApi {
    decorate(args?: NumericKeyboardOptions): Promise<any>;
}
export declare class NumericKeyboardView extends TextView {
    constructor();
}
