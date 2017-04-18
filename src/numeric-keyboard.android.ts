import { NumericKeyboardApi, NumericKeyboardOptions, NumericKeyboardViewBase } from "./numeric-keyboard.common";

export class NumericKeyboard implements NumericKeyboardApi {
  decorate(args?: NumericKeyboardOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class NumericKeyboardView extends NumericKeyboardViewBase {
  public createNativeView(): Object {
    let v = super.createNativeView();
    this.keyboardType = "number";
    return v;
  }
}