# NativeScript Numeric Keyboard

<img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/_readme-header.png" style="max-width: 100%"/>

## Installation
From the command prompt go to your app's root folder and execute:

```
tns plugin add nativescript-numeric-keyboard
```

## Demo app
Check out [the demo](demo) to test most options of this keyboard plugin.

You can run the demo app from the root of the project by typing `npm run demo.iphone` / `npm run demo.ipad`.

## How it works
This plugin wraps a [native keyboard library](https://cocoapods.org/?q=MMNumberKeyboard) and extends a regular [NativeScript TextField](https://docs.nativescript.org/cookbook/ui/text-field). You can set any property you'd normally set on this widget (`class`, `text`, etc) and a few plugin-specific properties as well.

## Screenshot-driven documentation
After adding the plugin you can add a namespace to your view (using `NumKey` below) and add a tag to render 

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:NumKey="nativescript-numeric-keyboard">
  <NumKey:NumericKeyboard text="123.45"/>
</Page>
```

For comparison sake we kick off with the default appearance of a `TextField` and then showcase the various properties this plugin exposes:

| Appearance | Declaration |
--- | --- | ---
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/regular-number.png" width="187px" height="333px"/> | `<TextField keyboardType="number" text="1.23"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/regular-phone.png" width="187px" height="333px"/> | `<TextField keyboardType="phone" text="12.34"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/default-plugin-appearance.png" width="187px" height="333px"/> | `<NumKey:NumericKeyboard text="123.45"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/custom-button-title.png" width="187px" height="333px"/> | `<NumKey:NumericKeyboard text="234.56" returnKeyTitle="OK"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/no-decimals.png" width="187px" height="333px"/> | `<NumKey:NumericKeyboard noDecimals="true" text="345"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/locale-en_US.png" width="187px" height="333px"/> | `<NumKey:NumericKeyboard locale="en_US" text="456.78"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/locale-nl_NL.png" width="187px" height="333px"/> | `<NumKey:NumericKeyboard locale="nl_NL" text="567,89"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/no-return-key.png" width="187px" height="333px"/> | `<NumKey:NumericKeyboard noReturnKey="true" text="678"/>` |


### iPad appearance
iPad appearance is largely similar, except for some blank space on both sides of the keyboard:

| Appearance | Declaration |
--- | --- | ---
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/ipad-regular-phone.png" width="344px"/> | `<TextField keyboardType="phone" text="12.34"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/ipad-default-appearance.png" width="344px"/> | `<NumKey:NumericKeyboard text="123.45"/>` |
