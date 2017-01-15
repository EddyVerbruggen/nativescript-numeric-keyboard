import { CommonNumericKeyboardView } from "./numeric-keyboard.common";

export class NumericKeyboard extends CommonNumericKeyboardView {
  constructor() {
    super();
    this.keyboardType = "number";
  }
}