import { TextView } from "ui/text-view";

export interface NumericKeyboardOptions {
  textView: TextView;
  noDecimals?: boolean;
  noReturnKey?: boolean;
  returnKeyTitle?: string;
  locale?: string;
  noIpadInputBar?: boolean;
  // onReturnKeyPressed?: (keyboard: any) => boolean;
}

export interface NumericKeyboardApi {
  decorate(args: NumericKeyboardOptions): Promise<any>;
}