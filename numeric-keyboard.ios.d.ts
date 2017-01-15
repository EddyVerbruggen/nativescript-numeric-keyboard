import { CommonNumericKeyboardView } from "./numeric-keyboard.common";
export declare class NumericKeyboard extends CommonNumericKeyboardView {
    private _returnKeyTitle;
    private _locale;
    private _noDecimals;
    private _noReturnKey;
    private _ios;
    onLoaded(): void;
    readonly ios: any;
    readonly _nativeView: any;
    returnKeyTitle: string;
    noDecimals: boolean;
    locale: string;
    noReturnKey: boolean;
}
