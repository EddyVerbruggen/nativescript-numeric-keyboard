import { NumericKeyboardApi, NumericKeyboardOptions } from "./numeric-keyboard.common";
import { TextView } from "ui/text-view";
export interface TextAndDecimalSeparatorHolder {
    getDecimalSeparator(): string;
    getText(): string;
}
export declare class NumericKeyboard implements NumericKeyboardApi, TextAndDecimalSeparatorHolder {
    private _keyboardDelegate;
    private _keyboard;
    private _nativeTextView;
    private _decimalSep;
    getDecimalSeparator(): string;
    getText(): string;
    decorate(args?: NumericKeyboardOptions): Promise<any>;
}
export declare class NumericKeyboardView extends TextView implements TextAndDecimalSeparatorHolder {
    private _returnKeyTitle;
    private _locale;
    private _noDecimals;
    private _noReturnKey;
    private _noIpadInputBar;
    private _keyboardDelegate;
    _ios: any;
    private _loaded;
    private _keyboard;
    private _decimalSep;
    getDecimalSeparator(): string;
    getText(): string;
    readonly ios: any;
    readonly _nativeView: any;
    returnKeyTitle: string;
    noDecimals: boolean;
    locale: string;
    noReturnKey: boolean;
    noIpadInputBar: boolean;
}
