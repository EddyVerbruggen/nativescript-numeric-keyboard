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

  // prevents a crash on {N} 3 because editabletextbase doesn't check for this function to be defined before invoking it,
  // see https://github.com/NativeScript/NativeScript/issues/4123
  public _onReturnPress(): void {
  }
}
