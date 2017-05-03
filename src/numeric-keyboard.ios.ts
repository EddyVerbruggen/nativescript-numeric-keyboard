import {
  NumericKeyboardApi,
  NumericKeyboardOptions,
  NumericKeyboardViewBase,
  TextAndDecimalSeparatorHolder,
  returnKeyTitleProperty,
  localeProperty,
  noDecimalsProperty,
  noReturnKeyProperty,
  noIpadInputBarProperty
} from "./numeric-keyboard.common";
import { Color } from "color";

declare const MMNumberKeyboard, CGRectZero, UIInputViewStyleDefault, UIInputViewStyleKeyboard,
    NSLocale, MMNumberKeyboardDelegate, MMNumberKeyboardButtonStyleGray, NSLineBreakByTruncatingHead: any;

// make sure this is retained
let _numkeyboard: NumericKeyboard;

export class NumericKeyboard implements NumericKeyboardApi, TextAndDecimalSeparatorHolder {
  private _keyboardDelegate: MMNumberKeyboardDelegateImpl;
  private _keyboard: any;
  private _nativeTextView: any;
  private _decimalSep: string = "unset";

  getDecimalSeparator(): string {
    return this._decimalSep;
  }

  getText(): string {
    return this._nativeTextView.text;
  }

  decorate(args?: NumericKeyboardOptions): Promise<any> {
    const that = this;
    _numkeyboard = this;

    return new Promise((resolve, reject) => {
      if (!args || !args.textView) {
        reject("Setting the 'textView' property is mandatory.");
        return;
      }

      let nslocale = null;
      if (args.locale) {
        nslocale = NSLocale.localeWithLocaleIdentifier(args.locale);
      } else {
        nslocale = NSLocale.currentLocale;
      }
      this._decimalSep = nslocale.decimalSeparator;
      this._keyboard = MMNumberKeyboard.alloc().initWithFrameInputViewStyleLocale(CGRectZero, UIInputViewStyleKeyboard, nslocale);

      if (args.returnKeyTitle) {
        this._keyboard.returnKeyTitle = args.returnKeyTitle;
      }

      this._keyboard.allowsDecimalPoint = !args.noDecimals;

      // not exposing this just yet (not too useful)
      // keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleDone; // (Done = default, there's also White and Gray)

      this._keyboardDelegate = MMNumberKeyboardDelegateImpl.initWithOwner(new WeakRef(this));
      this._keyboard.delegate = this._keyboardDelegate;

      if (args.noReturnKey) {
        this._keyboardDelegate.setCallback(function () {
          return false;
        });
        this._keyboard.returnKeyTitle = " ";
        this._keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleGray; // (Done (blue) = default, there's also White)
      } else if (!args.returnKeyTitle) {
        this._keyboard.returnKeyTitle = " ";
      }

      this._nativeTextView = args.textView.ios ? args.textView.ios : args.textView;
      this._nativeTextView.inputView = this._keyboard;

      // not always available, fi when binding to a SearchBar
      if (this._nativeTextView.textContainer !== undefined) {
        this._nativeTextView.textContainer.maximumNumberOfLines = 1;
        this._nativeTextView.textContainer.lineBreakMode = NSLineBreakByTruncatingHead;
        this._nativeTextView.scrollEnabled = false;
      }

      if (args.textView.ios !== undefined && !args.textView.backgroundColor) {
        args.textView.backgroundColor = new Color("transparent");
      }

      if (args.noIpadInputBar && this._nativeTextView.inputAssistantItem) {
        this._nativeTextView.inputAssistantItem.leadingBarButtonGroups = [];
        this._nativeTextView.inputAssistantItem.trailingBarButtonGroups = [];
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
  private _keyboard: any;

  public createNativeView(): Object {
    let v = super.createNativeView();
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
    this._keyboard = MMNumberKeyboard.alloc().initWithFrameInputViewStyleLocale(CGRectZero, UIInputViewStyleDefault, nslocale);

    if (this.returnKeyTitle) {
      this._keyboard.returnKeyTitle = this.returnKeyTitle;
    }
    this._keyboard.allowsDecimalPoint = !this.noDecimals;

    this._keyboardDelegate = MMNumberKeyboardDelegateImpl.initWithOwner(new WeakRef(this));
    this._keyboard.delegate = this._keyboardDelegate;

    if (this.noReturnKey) {
      this._keyboardDelegate.setCallback(function () {
        return false;
      });
      this._keyboard.returnKeyTitle = " ";
      this._keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleGray; // (Done (blue) = default, there's also White)
    } else if (!this.returnKeyTitle) {
      this._keyboard.returnKeyTitle = " ";
    }

    this.nativeView.textContainer.maximumNumberOfLines = 1;
    this.nativeView.textContainer.lineBreakMode = NSLineBreakByTruncatingHead;
    this.nativeView.scrollEnabled = false;

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
class MMNumberKeyboardDelegateImpl extends NSObject /* implements MMNumberKeyboardDelegate */ {
  public static ObjCProtocols = [MMNumberKeyboardDelegate];

  private _owner: WeakRef<any>;

  public static initWithOwner(owner: WeakRef<any>): MMNumberKeyboardDelegateImpl {
    let delegate = <MMNumberKeyboardDelegateImpl>MMNumberKeyboardDelegateImpl.new();
    delegate._owner = owner;
    return delegate;
  }

  private _onReturnKeyPressedCallback: (keyboard) => void;

  public setCallback(callback: (keyboard?) => boolean): void {
    this._onReturnKeyPressedCallback = callback;
  }

  public numberKeyboardShouldInsertText(keyboard, text) {
    let decimalSeparator: string = (<TextAndDecimalSeparatorHolder>this._owner.get()).getDecimalSeparator();
    if (text === decimalSeparator) {
      let oldText: string = "" + (<TextAndDecimalSeparatorHolder>this._owner.get()).getText();
      return oldText.indexOf(decimalSeparator) === -1;
    }
    return true;
  }

  public numberKeyboardShouldReturn(keyboard) {
    if (this._onReturnKeyPressedCallback) {
      return this._onReturnKeyPressedCallback(keyboard);
    } else {
      return true;
    }
  }
}
