import { NumericKeyboardApi, NumericKeyboardOptions } from "./numeric-keyboard.common";
import { TextView } from "ui/text-view";
export declare class NumericKeyboard implements NumericKeyboardApi {
    private _keyboardDelegate;
    private _keyboard;
    decorate(args?: NumericKeyboardOptions): Promise<any>;
}
export declare class NumericKeyboardView extends TextView {
    private _returnKeyTitle;
    private _locale;
    private _noDecimals;
    private _noReturnKey;
    private _noIpadInputBar;
    private _keyboardDelegate;
    _ios: any;
    private _loaded;
    private _keyboard;
    readonly ios: any;
    readonly _nativeView: any;
    returnKeyTitle: string;
    noDecimals: boolean;
    locale: string;
    noReturnKey: boolean;
    noIpadInputBar: boolean;
}
