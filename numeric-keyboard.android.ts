import { NumericKeyboardApi, NumericKeyboardOptions } from "./numeric-keyboard.common";
import { TextView } from "ui/text-view";

export class NumericKeyboard implements NumericKeyboardApi {
  decorate(args?: NumericKeyboardOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
}

export class NumericKeyboardView extends TextView {
  constructor() {
    super();
    this.keyboardType = "number";
  }
}