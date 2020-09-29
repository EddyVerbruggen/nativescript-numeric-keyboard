import * as elementRegistryModule from "@nativescript/angular";
import { Directive } from "@angular/core";

import { NumericKeyboardView } from "nativescript-numeric-keyboard";

@Directive({
  selector: "NumericKeyboard"
})

export class NumericKeyboardDirective {
  constructor() { }
}

export const NSNUMKEY_DIRECTIVES = [ NumericKeyboardDirective ];

elementRegistryModule.registerElement("NumericKeyboard", () => NumericKeyboardView);