import { Color } from "tns-core-modules/color";
import {
  localeProperty,
  noDecimalsProperty,
  noIpadInputBarProperty,
  noReturnKeyProperty,
  NumericKeyboardApi,
  NumericKeyboardOptions,
  NumericKeyboardViewBase,
  returnKeyTitleProperty,
  TextAndDecimalSeparatorHolder
} from "./numeric-keyboard.common";

// making sure this is retained
let _numkeyboard: NumericKeyboard;

export class NumericKeyboard implements NumericKeyboardApi, TextAndDecimalSeparatorHolder {
  private _keyboardDelegate: MMNumberKeyboardDelegateImpl;
  private _keyboard: MMNumberKeyboard;
  private _nativeTextField: UITextField;
  private _decimalSep: string = "unset";
  private _maxLength: number;

  getDecimalSeparator(): string {
    return this._decimalSep;
  }

  getText(): string {
    return this._nativeTextField.text;
  }

  getMaxLength(): number {
    return this._maxLength;
  }

  getNativeTextField(): any {
    return this._nativeTextField;
  }

  decorate(args?: NumericKeyboardOptions): Promise<any> {
    _numkeyboard = this;

    return new Promise((resolve, reject) => {
      if (!args || !args.textField) {
        reject("Setting the 'textField' property is mandatory.");
        return;
      }

      this._maxLength = args.textField.maxLength;

      let nslocale = null;
      if (args.locale) {
        nslocale = NSLocale.localeWithLocaleIdentifier(args.locale);
      } else {
        nslocale = NSLocale.currentLocale;
      }
      this._decimalSep = nslocale.decimalSeparator;
      this._keyboard = MMNumberKeyboard.alloc().initWithFrameInputViewStyleLocale(CGRectZero, UIInputViewStyle.Keyboard, nslocale);

      if (args.returnKeyTitle) {
        this._keyboard.returnKeyTitle = args.returnKeyTitle;
      }

      this._keyboard.allowsDecimalPoint = !args.noDecimals;

      // not exposing this just yet (not too useful)
      // keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleDone; // (Done = default, there's also White and Gray)

      this._keyboardDelegate = MMNumberKeyboardDelegateImpl.initWithOwner(new WeakRef(this));
      this._keyboard.delegate = this._keyboardDelegate;

      if (args.noReturnKey) {
        this._keyboardDelegate.setCallback(() => false);
        this._keyboard.returnKeyTitle = " ";
        this._keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyle.Gray; // (Done (blue) = default, there's also White)
      } else if (!args.returnKeyTitle) {
        this._keyboard.returnKeyTitle = " ";
      }

      this._nativeTextField = args.textField.ios ? args.textField.ios : args.textField;
      this._nativeTextField.inputView = this._keyboard;

      if (args.textField.ios !== undefined && !args.textField.backgroundColor) {
        args.textField.backgroundColor = new Color("transparent");
      }

      if (args.noIpadInputBar && this._nativeTextField.inputAssistantItem) {
        (<any>this._nativeTextField.inputAssistantItem).leadingBarButtonGroups = [];
        (<any>this._nativeTextField.inputAssistantItem).trailingBarButtonGroups = [];
      }

      resolve();
    });
  }
}

export class NumericKeyboardView extends NumericKeyboardViewBase {
  returnKeyTitle: string;
  locale: string;
  noDecimals: boolean;
  noReturnKey: boolean;
  noIpadInputBar: boolean;

  private _keyboardDelegate: MMNumberKeyboardDelegateImpl = null;
  private _keyboard: MMNumberKeyboard;

  public createNativeView(): Object {
    const v = super.createNativeView();
    this.applyProperties();
    return v;
  }

  private applyProperties(): void {
    let nslocale: NSLocale;
    if (this.locale) {
      nslocale = NSLocale.localeWithLocaleIdentifier(this.locale);
    } else {
      nslocale = NSLocale.currentLocale;
    }
    this._decimalSep = nslocale.decimalSeparator;
    this._keyboard = MMNumberKeyboard.alloc().initWithFrameInputViewStyleLocale(CGRectZero, UIInputViewStyle.Default, nslocale);

    if (this.returnKeyTitle) {
      this._keyboard.returnKeyTitle = this.returnKeyTitle;
    }
    this._keyboard.allowsDecimalPoint = !this.noDecimals;

    this._keyboardDelegate = MMNumberKeyboardDelegateImpl.initWithOwner(new WeakRef(this));
    this._keyboard.delegate = this._keyboardDelegate;

    if (this.noReturnKey) {
      this._keyboardDelegate.setCallback(() => {
        return false;
      });
      this._keyboard.returnKeyTitle = " ";
      this._keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyle.Gray; // (Done (blue) = default, there's also White)
    } else if (!this.returnKeyTitle) {
      this._keyboard.returnKeyTitle = " ";
    }

    // not exposing this just yet (not too useful)
    // keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleDone; // (Done = default, there's also White and Gray)
    this.nativeView.inputView = this._keyboard;

    if (this.noIpadInputBar && this.nativeView.inputAssistantItem) {
      this.nativeView.inputAssistantItem.leadingBarButtonGroups = [];
      this.nativeView.inputAssistantItem.trailingBarButtonGroups = [];
    }

    // if not set by the user make it transparent (just like regular TextFields are)
    if (!this.backgroundColor) {
      this.backgroundColor = new Color("transparent");
    }
  }

  [returnKeyTitleProperty.setNative](value: string) {
    this.returnKeyTitle = value;
  }

  [localeProperty.setNative](value: string) {
    this.locale = value;
  }

  [noDecimalsProperty.setNative](value: boolean) {
    this.noDecimals = value;
  }

  [noReturnKeyProperty.setNative](value: boolean) {
    this.noReturnKey = value;
  }

  [noIpadInputBarProperty.setNative](value: boolean) {
    this.noIpadInputBar = value;
  }
}

// https://developer.apple.com/reference/homekit/hmaccessorybrowserdelegate?language=objc
class MMNumberKeyboardDelegateImpl extends NSObject implements MMNumberKeyboardDelegate {
  public static ObjCProtocols = [MMNumberKeyboardDelegate];

  private _owner: WeakRef<TextAndDecimalSeparatorHolder>;

  public static initWithOwner(owner: WeakRef<TextAndDecimalSeparatorHolder>): MMNumberKeyboardDelegateImpl {
    const delegate = <MMNumberKeyboardDelegateImpl>MMNumberKeyboardDelegateImpl.new();
    delegate._owner = owner;
    return delegate;
  }

  private _onReturnKeyPressedCallback: (keyboard) => boolean;

  public setCallback(callback: (keyboard?) => boolean): void {
    this._onReturnKeyPressedCallback = callback;
  }

  public numberKeyboardShouldInsertText(keyboard, text): boolean {
    const owner = <any>this._owner.get();
    const nativeView = owner.getNativeTextField();
    const oldText = "" + this._owner.get().getText();

    const decimalSeparator: string = this._owner.get().getDecimalSeparator();
    if (text === decimalSeparator) {
      return oldText.indexOf(decimalSeparator) === -1;
    }

    const maxLength: number = this._owner.get().getMaxLength();
    const shouldInsert = !(maxLength && this._owner.get().getText() && this._owner.get().getText().length + text.length > maxLength);
    if (!shouldInsert) {
      return false;
    }

    const range = {
      location: 0,
      length: nativeView.text.length === 0 ? 0 : nativeView.text.length
    };

    if (nativeView.delegate && nativeView.delegate.textFieldShouldChangeCharactersInRangeReplacementString) {
      nativeView.delegate.textFieldShouldChangeCharactersInRangeReplacementString(nativeView, range, nativeView.text + text);
    }
    return true;
  }

  numberKeyboardShouldDeleteBackward(keyboard): boolean {
    const owner = <any>this._owner.get();
    const nativeView = owner.getNativeTextField();

    const range = <NSRange>{
      location: 0,
      length: nativeView.text.length === 0 ? 0 : nativeView.text.length
    };
    let current = nativeView.text;
    current = current.substring(0, current.length - 1);

    if (nativeView.delegate && nativeView.delegate.textFieldShouldChangeCharactersInRangeReplacementString) {
      nativeView.delegate.textFieldShouldChangeCharactersInRangeReplacementString(nativeView, range, current);
    }
    return true;
  }

  public numberKeyboardShouldReturn(keyboard): boolean {
    if (this._onReturnKeyPressedCallback) {
      return this._onReturnKeyPressedCallback(keyboard);
    } else {
      return true;
    }
  }
}
