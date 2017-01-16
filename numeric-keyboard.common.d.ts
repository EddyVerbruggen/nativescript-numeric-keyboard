import { TextView } from "ui/text-view";
export interface NumericKeyboardOptions {
    textView: TextView;
    noDecimals?: boolean;
    noReturnKey?: boolean;
    returnKeyTitle?: string;
    locale?: string;
}
export interface NumericKeyboardApi {
    decorate(args: NumericKeyboardOptions): Promise<any>;
}
