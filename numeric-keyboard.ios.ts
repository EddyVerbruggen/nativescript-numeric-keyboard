import { NumericKeyboardApi, NumericKeyboardOptions } from "./numeric-keyboard.common";
import { TextView } from "ui/text-view";
import { Color } from "color";
import { Property } from "tns-core-modules/ui/core/view";

declare const MMNumberKeyboard, CGRectZero, UIInputViewStyleDefault, UIInputViewStyleKeyboard,
    NSLocale, MMNumberKeyboardDelegate, MMNumberKeyboardButtonStyleGray, NSLineBreakByTruncatingHead: any;

export interface TextAndDecimalSeparatorHolder {
  getDecimalSeparator(): string;
  getText(): string;
}

// make sure this is retained
let _numkeyboard: NumericKeyboard;

export class NumericKeyboard implements NumericKeyboardApi, TextAndDecimalSeparatorHolder {
  private _keyboardDelegate: MMNumberKeyboardDelegateImpl;
  private _keyboard: any;
  private _nativeTextView: any;
  private _decimalSep: string = "unset";

  getDecimalSeparator(): string {
    return this._decimalSep;
  };

  getText(): string {
    return this._nativeTextView.text;
  };

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
          return false
        });
        if (!args.returnKeyTitle) {
          this._keyboard.returnKeyTitle = " ";
          this._keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleGray; // (Done (blue) = default, there's also White)
        }
      }

      this._nativeTextView = args.textView.ios ? args.textView.ios : args.textView;
      this._nativeTextView.inputView = this._keyboard;

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

export class NumericKeyboardView extends TextView implements TextAndDecimalSeparatorHolder {
  returnKeyTitle: string;

  private _locale: string;
  private _noDecimals: boolean;
  private _noReturnKey: boolean;
  private _noIpadInputBar: boolean;
  private _keyboardDelegate: MMNumberKeyboardDelegateImpl = null;
  //public _ios: any;
  private _loaded: boolean = false;
  private _keyboard: any;
  private _decimalSep: string = "unset";

  constructor() {
    super();
    console.log("--- constr");
    this.iosxx();
  }

  get ios(): TextView {
    return this.nativeView;
  }

  getDecimalSeparator(): string {
    return this._decimalSep;
  };

  getText(): string {
    return this.text;
  };

  /* MMNumberKeyboard */
  iosxx(): void {
    // if (!this._loaded) {
    //   this._loaded = true;
      let nslocale = null;
      if (this._locale) {
        nslocale = NSLocale.localeWithLocaleIdentifier(this._locale);
      } else {
        nslocale = NSLocale.currentLocale;
      }
      this._decimalSep = nslocale.decimalSeparator;
      this._keyboard = MMNumberKeyboard.alloc().initWithFrameInputViewStyleLocale(CGRectZero, UIInputViewStyleDefault, nslocale);

      if (this.returnKeyTitle) {
        this._keyboard.returnKeyTitle = this.returnKeyTitle;
      }
      this._keyboard.allowsDecimalPoint = !this._noDecimals;

      this._keyboardDelegate = MMNumberKeyboardDelegateImpl.initWithOwner(new WeakRef(this));
      this._keyboard.delegate = this._keyboardDelegate;

      if (this._noReturnKey) {
        this._keyboardDelegate.setCallback(function () {
          return false
        });
        if (!this.returnKeyTitle) {
          this._keyboard.returnKeyTitle = " ";
          this._keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleGray; // (Done (blue) = default, there's also White)
        }
      }

      this.nativeView.textContainer.maximumNumberOfLines = 1;
      this.nativeView.textContainer.lineBreakMode = NSLineBreakByTruncatingHead;
      // not exposing this just yet (not too useful)
      // keyboard.returnKeyButtonStyle = MMNumberKeyboardButtonStyleDone; // (Done = default, there's also White and Gray)
      this.nativeView.inputView = this._keyboard;

      if (this._noIpadInputBar && this.nativeView.inputAssistantItem) {
        this.nativeView.inputAssistantItem.leadingBarButtonGroups = [];
        this.nativeView.inputAssistantItem.trailingBarButtonGroups = [];
      }

      // if not set by the user make it transparent (just like regular TextFields are)
      if (!this.backgroundColor) {
        this.backgroundColor = new Color("transparent");
      }
    // }
    // return this.nativeView;
  }

//  get _nativeView(): any {
//    return this.nativeView;
//  }

  // set returnKeyTitle(value: string) {
  //   this._returnKeyTitle = value;
  // }

  [returnKeyTitleProperty.getDefault](): string {
    return "Done";
  }

  [returnKeyTitleProperty.setNative](value: string) {
    this.returnKeyTitle = value;
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

  set noIpadInputBar(value: boolean) {
    this._noIpadInputBar = value;
  }
}

// Define returnKeyTitle and register it
export const returnKeyTitleProperty = new Property<NumericKeyboardView, string>({ name: "returnKeyTitle", defaultValue: "Done" });
returnKeyTitleProperty.register(NumericKeyboardView);

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
  };
}
