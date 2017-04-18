import * as elementRegistryModule from "nativescript-angular/element-registry";
import { Directive } from '@angular/core';

// TODO enable
// import { NumericKeyboardView } from "nativescript-numeric-keyboard";

@Directive({
  selector: "NumericKeyboard"
})

export class NumericKeyboardDirective {
  constructor() { }
}

export const NSNUMKEY_DIRECTIVES = [ NumericKeyboardDirective ];

// TODO enable
// elementRegistryModule.registerElement("NumericKeyboard", () => NumericKeyboardView);