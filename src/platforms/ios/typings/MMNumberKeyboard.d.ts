declare class MMNumberKeyboard extends UIInputView {

  static alloc(): MMNumberKeyboard; // inherited from NSObject

  static appearance(): MMNumberKeyboard; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): MMNumberKeyboard; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MMNumberKeyboard; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): MMNumberKeyboard; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MMNumberKeyboard; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): MMNumberKeyboard; // inherited from UIAppearance

  static new(): MMNumberKeyboard; // inherited from NSObject

  allowsDecimalPoint: boolean;

  delegate: MMNumberKeyboardDelegate;

  keyInput: UIKeyInput;

  returnKeyButtonStyle: MMNumberKeyboardButtonStyle;

  returnKeyButtonBackgroundColor: UIColor;

  returnKeyTitle: string;

  constructor(o: { frame: CGRect; inputViewStyle: UIInputViewStyle; locale: NSLocale; });

  configureSpecialKeyWithImageActionHandler(image: UIImage, handler: () => void): void;

  configureSpecialKeyWithImageTargetAction(image: UIImage, target: any, action: string): void;

  initWithFrameInputViewStyleLocale(frame: CGRect, inputViewStyle: UIInputViewStyle, locale: NSLocale): this;
}

declare const enum MMNumberKeyboardButtonStyle {

  White = 0,

  Gray = 1,

  Done = 2
}

interface MMNumberKeyboardDelegate extends NSObjectProtocol {

  numberKeyboardShouldDeleteBackward?(numberKeyboard: MMNumberKeyboard): boolean;

  numberKeyboardShouldInsertText?(numberKeyboard: MMNumberKeyboard, text: string): boolean;

  numberKeyboardShouldReturn?(numberKeyboard: MMNumberKeyboard): boolean;
}

declare var MMNumberKeyboardDelegate: {

  prototype: MMNumberKeyboardDelegate;
};

declare var MMNumberKeyboardVersionNumber: number;

declare var MMNumberKeyboardVersionNumberVar: number;

declare var MMNumberKeyboardVersionString: interop.Reference<number>;

declare var MMNumberKeyboardVersionStringVar: interop.Reference<number>;
