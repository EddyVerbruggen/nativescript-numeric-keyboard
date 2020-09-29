import * as elementRegistryModule from "@nativescript/angular";
import { Directive } from "@angular/core";
import { NumericKeyboardView } from "nativescript-numeric-keyboard";
let NumericKeyboardDirective = class NumericKeyboardDirective {
    constructor() { }
};
NumericKeyboardDirective = __decorate([
    Directive({
        selector: "NumericKeyboard"
    }),
    __metadata("design:paramtypes", [])
], NumericKeyboardDirective);
export { NumericKeyboardDirective };
export const NSNUMKEY_DIRECTIVES = [NumericKeyboardDirective];
elementRegistryModule.registerElement("NumericKeyboard", () => NumericKeyboardView);
//# sourceMappingURL=nativescript-numeric-keyboard-directives.js.map