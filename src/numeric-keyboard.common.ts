import { TextField, Property, Color, booleanConverter } from "@nativescript/core";

export interface NumericKeyboardOptions {
  textField: TextField;
  noDecimals?: boolean;
  noReturnKey?: boolean;
  returnKeyButtonBackgroundColor?: Color;
  returnKeyTitle?: string;
  locale?: string;
  noIpadInputBar?: boolean;
  onReturnKeyPressed?: () => boolean;
}

export interface NumericKeyboardApi {
  decorate(args: NumericKeyboardOptions): Promise<any>;
}

export interface TextAndDecimalSeparatorHolder {
  getDecimalSeparator(): string;
  getText(): string;
  getMaxLength(): number;
  getNativeTextField(): any;
}

export abstract class NumericKeyboardViewBase extends TextField implements TextAndDecimalSeparatorHolder {
  _decimalSep: string = "unset";

  get ios(): any {
    return this.nativeView;
  }

  set ios(value) {
    this.nativeView = value;
  }

  getDecimalSeparator(): string {
    return this._decimalSep;
  }

  getText(): string {
    return this.text;
  }

  getMaxLength(): number {
    return this.maxLength;
  }

  getNativeTextField(): number {
    return this.nativeView;
  }
}

export const returnKeyTitleProperty = new Property<NumericKeyboardViewBase, string>({
  name: "returnKeyTitle",
  defaultValue: "Done"
});
returnKeyTitleProperty.register(NumericKeyboardViewBase);

export const localeProperty = new Property<NumericKeyboardViewBase, string>({name: "locale"});
localeProperty.register(NumericKeyboardViewBase);

export const noDecimalsProperty = new Property<NumericKeyboardViewBase, boolean>({
  name: "noDecimals",
  defaultValue: false,
  valueConverter: booleanConverter
});
noDecimalsProperty.register(NumericKeyboardViewBase);

export const noReturnKeyProperty = new Property<NumericKeyboardViewBase, boolean>({
  name: "noReturnKey",
  defaultValue: false,
  valueConverter: booleanConverter
});
noReturnKeyProperty.register(NumericKeyboardViewBase);

export const returnKeyButtonBackgroundColorProperty = new Property<NumericKeyboardViewBase, Color>({
  name: "returnKeyButtonBackgroundColor",
  defaultValue: null,
  valueConverter: (c: string) => new Color(c)
});
returnKeyButtonBackgroundColorProperty.register(NumericKeyboardViewBase);

export const noIpadInputBarProperty = new Property<NumericKeyboardViewBase, boolean>({
  name: "noIpadInputBar",
  defaultValue: false,
  valueConverter: booleanConverter
});
noIpadInputBarProperty.register(NumericKeyboardViewBase);
