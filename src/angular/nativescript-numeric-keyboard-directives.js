"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elementRegistryModule = require("nativescript-angular/element-registry");
var core_1 = require("@angular/core");
var __1 = require("../");
var NumericKeyboardDirective = (function () {
    function NumericKeyboardDirective() {
    }
    NumericKeyboardDirective = __decorate([
        core_1.Directive({
            selector: "NumericKeyboard"
        }),
        __metadata("design:paramtypes", [])
    ], NumericKeyboardDirective);
    return NumericKeyboardDirective;
}());
exports.NumericKeyboardDirective = NumericKeyboardDirective;
exports.NSNUMKEY_DIRECTIVES = [NumericKeyboardDirective];
elementRegistryModule.registerElement("NumericKeyboard", function () { return __1.NumericKeyboardView; });
//# sourceMappingURL=nativescript-numeric-keyboard-directives.js.map