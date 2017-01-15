import { CommonNumericKeyboardView } from "./numeric-keyboard.common";

declare const MMNumberKeyboard, CGRectZero, UIInputViewStyleDefault,
    NSLocale, MMNumberKeyboardDelegate, MMNumberKeyboardButtonStyleGray : any;

export class NumericKeyboard extends CommonNumericKeyboardView {
  private _returnKeyTitle: string;
  private _locale: string;
  private _noDecimals: boolean;
  private _noReturnKey: boolean;
  private _ios: any; // = MMNumberKeyboard;

  public onLoaded() {
    let nslocale = null;
    if (this._locale) {
      nslocale = NSLocale.localeWithLocaleIdentifier(this._locale);
    }
    const keyboard = MMNumberKeyboard.alloc().initWithFrameInputViewStyleLocale(CGRectZero, UIInputViewStyleDefault, nslocale);

    if (this._returnKeyTitle) {
      keyboard.returnKeyTitle = this._returnKeyTitle;
    }

    keyboard.allowsDecimalPoint = !this._noDecimals;

    // not exposing this just yet (not too useful)
    // keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleDone; // (Done = default, there's also White and Gray)

    if (this._noReturnKey) {
      keyboard.delegate = MMNumberKeyboardDelegateImpl.new().initWithCallback(function() { return false});
      if (!this._returnKeyTitle) {
        keyboard.returnKeyTitle = " ";
        keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleGray; // (Done (blue) = default, there's also White)
      }
    }

    this._ios.inputView = keyboard;
  }

  get ios(): any {
    return this._ios;
  }

  get _nativeView(): any {
    return this._ios;
  }

  set returnKeyTitle(value: string) {
    this._returnKeyTitle = value;
  }

  set noDecimals(value: boolean) {
    this._noDecimals = value;
  }

  set locale(value: string) {
    this._locale = value;
  }

  set noReturnKey(value: boolean) {
    this._noReturnKey = value;
  }
}

// https://developer.apple.com/reference/homekit/hmaccessorybrowserdelegate?language=objc
class MMNumberKeyboardDelegateImpl extends NSObject /* implements MMNumberKeyboardDelegate */ {
  public static ObjCProtocols = [MMNumberKeyboardDelegate];

  static new(): MMNumberKeyboardDelegateImpl {
    return <MMNumberKeyboardDelegateImpl>super.new();
  }

  private _onReturnKeyPressedCallback: (keyboard) => void;

  public initWithCallback(callback: (keyboard?) => boolean): MMNumberKeyboardDelegateImpl {
    this._onReturnKeyPressedCallback = callback;
    return this;
  }

  public numberKeyboardShouldReturn(keyboard) {
    if (this._onReturnKeyPressedCallback) {
      return this._onReturnKeyPressedCallback(keyboard);
    } else {
      return true;
    }
  };
}
