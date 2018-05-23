# NativeScript Numeric Keyboard

[![Build Status][build-status]][build-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[build-status]:https://travis-ci.org/EddyVerbruggen/nativescript-numeric-keyboard.svg?branch=master
[build-url]:https://travis-ci.org/EddyVerbruggen/nativescript-numeric-keyboard
[npm-image]:http://img.shields.io/npm/v/nativescript-numeric-keyboard.svg
[npm-url]:https://npmjs.org/package/nativescript-numeric-keyboard
[downloads-image]:http://img.shields.io/npm/dm/nativescript-numeric-keyboard.svg
[twitter-image]:https://img.shields.io/twitter/follow/eddyverbruggen.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/eddyverbruggen

For iOS. Falls back to the best platform-provided numeric keyboard on Android. Note that the iPad UI looks a bit sleeker than shown in the screenshot below.

<img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/_readme-header.png" style="max-width: 100%"/>

> BREAKING CHANGE in plugin version 4.0.0: we used to extend a `TextView`, now it's a `TextField`, because I finally hacked my way around a problem that prevented a TextField from emitting a `textChange` event. Note that unless you use the `decorate()` function this will not affect you (bar some now-fixed UI glitches).

## Installation
From the command prompt go to your app's root folder and execute:

```
tns plugin add nativescript-numeric-keyboard
```

## Demo app
Check out [the demo](demo) to play with the keyboard. You can run it by typing `npm run demo.iphone` / `npm run demo.ipad` at the root of the project.

## How it works
This plugin wraps a [native keyboard library](https://cocoapods.org/?q=MMNumberKeyboard) and extends a regular [NativeScript TextField](https://docs.nativescript.org/cookbook/ui/text-field).
You can set any property you'd normally set on this widget (`class`, `text`, etc) and a few plugin-specific properties as well.

You can either define the keyboard in XML or in code - use whichever tickles your fancy.

## Screenshot-driven documentation
After adding the plugin you can add a namespace to your view (using `NumKey` below) and use the `NumericKeyboardView` tag to render a TextField powered by this plugin.

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:NK="nativescript-numeric-keyboard">
  <NK:NumericKeyboardView text="123.45" maxLength="10" />
</Page>
```

For comparison sake we kick off with the default appearance of a `TextField` and then showcase the various properties this plugin exposes:

| Appearance | Declaration |
| --- | --- |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/regular-number.png" width="187px" height="333px"/> | `<TextField keyboardType="number" text="1.23"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/regular-phone.png" width="187px" height="333px"/> | `<TextField keyboardType="phone" text="12.34"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/default-plugin-appearance.png" width="187px" height="333px"/> | `<NK:NumericKeyboardView text="123.45"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/custom-button-title.png" width="187px" height="333px"/> | `<NK:NumericKeyboardView returnKeyTitle="OK" text="234.56"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/no-decimals.png" width="187px" height="333px"/> | `<NK:NumericKeyboardView noDecimals="true" text="345"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/no-return-key.png" width="187px" height="333px"/> | `<NK:NumericKeyboardView noReturnKey="true" text="678"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/locale-en_US.png" width="187px" height="333px"/> | `<NK:NumericKeyboardView locale="en_US" text="456.78"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/locale-nl_NL.png" width="187px" height="333px"/> | `<NK:NumericKeyboardView locale="nl_NL" text="567,89"/>` |


### iPad appearance
It's similar (although a bit cleaner than in these screenshots), except for some padding on both sides of the keyboard:

| Appearance | Declaration |
| --- | --- |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/ipad-regular-phone.png" width="344px"/> | `<TextField keyboardType="phone" text="12.34"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/ipad-default-appearance.png" width="344px"/> | `<NK:NumericKeyboard text="123.45"/>` |

## Usage with Angular
Open `app.module.ts` and add either of these:

#### With or without using Webpack

```typescript
import { registerElement } from "nativescript-angular";
registerElement("NumericKeyboard", () => require("nativescript-numeric-keyboard").NumericKeyboardView);
```

#### When not using Webpack you may use this instead
```typescript
import { NSNUMKEY_DIRECTIVES } from "nativescript-numeric-keyboard/angular";

declarations: [
  NSNUMKEY_DIRECTIVES,
]
```

For the views you can take a look at the examples above and just replace `NumKey:NumericKeyboardView` by `NumericKeyboard `:

```html
<NumericKeyboard noDecimals="true"></NumericKeyboard>
```

## Programmatic usage
Say you have a plain old `TextField` in your view:

```html
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded">
  <TextField id="myTextField" maxlength="8" keyboardType="number" text="{{ myTextPlugin }}" />
</Page>
```

Now you can enhance the `TextField` with this plugin by doing fi. this in the `pageLoaded` event you've defined in the `<Page>` tag above:

```js
import { NumericKeyboard } from "nativescript-numeric-keyboard";

export function pageLoaded(args: observable.EventData) {
  const page = <pages.Page>args.object;
  const textField = <TextField>page.getViewById("myTextField");
  // or even textField.ios

  // this is an example with all possible properties, not that they make sense combined :)
  new NumericKeyboard().decorate({
    textField: textField,
    returnKeyTitle: "Go!",
    locale: "en_US", // or "nl_NL", or any valid locale really (to define the decimal char)
    noReturnKey: true,
    noDecimals: true,
    noIpadInputBar: true // suppress the bar with buttons iOS renders on iPad since iOS 9
  });
}
```

Note that on Android you'll just get a numeric keyboard as usual (since we specified `keyboardType="number"`).
