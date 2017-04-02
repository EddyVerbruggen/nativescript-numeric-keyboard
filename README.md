# NativeScript Numeric Keyboard
For iOS. Falls back to the best platform-provided numeric keyboard on Android. Note that the iPad UI looks a bit sleeker than shown in the screenshot below.

<img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/_readme-header.png" style="max-width: 100%"/>

## Installation
From the command prompt go to your app's root folder and execute:

```
tns plugin add nativescript-numeric-keyboard
```

## Demo app
Check out [the demo](demo) to play with the keyboard. You can run it by typing `npm run demo.iphone` / `npm run demo.ipad` at the root of the project.

## How it works
This plugin wraps a [native keyboard library](https://cocoapods.org/?q=MMNumberKeyboard) and extends a regular [NativeScript TextView](https://docs.nativescript.org/cookbook/ui/text-view). You can set any property you'd normally set on this widget (`class`, `text`, etc) and a few plugin-specific properties as well.

You can either define the keyboard in XML or in code - use whichever tickles your fancy.

## Screenshot-driven documentation
After adding the plugin you can add a namespace to your view (using `NumKey` below) and use the `NumericKeyboardView` tag to render a TextView powered by this plugin.

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:NK="nativescript-numeric-keyboard">
  <NK:NumericKeyboardView text="123.45"/>
</Page>
```

For comparison sake we kick off with the default appearance of a `TextView` and then showcase the various properties this plugin exposes:

| Appearance | Declaration |
| --- | --- |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/regular-number.png" width="187px" height="333px"/> | `<TextView keyboardType="number" text="1.23"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/regular-phone.png" width="187px" height="333px"/> | `<TextView keyboardType="phone" text="12.34"/>` |
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
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/ipad-regular-phone.png" width="344px"/> | `<TextView keyboardType="phone" text="12.34"/>` |
| <img src="https://raw.githubusercontent.com/EddyVerbruggen/nativescript-numeric-keyboard/master/screenshots/ipad-default-appearance.png" width="344px"/> | `<NK:NumericKeyboard text="123.45"/>` |

## Usage with Angular
Open `app.module.ts` and add:

```js
import { NSNUMKEY_DIRECTIVES } from "nativescript-numeric-keyboard/angular";

declarations: [
  NSNUMKEY_DIRECTIVES,
  // any other declarations
]
```

For the views you can take a look at the examples above and just replace `NumKey:NumericKeyboardView` by `NumericKeyboard `:

```html
<NumericKeyboard noDecimals="true"></NumericKeyboard>
```

## Programmatic usage
Say you have a plain old `TextView` in your view:

```html
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded">
  <TextView id="myTextView" keyboardType="number" text="{{ myTextPlugin }}" />
</Page>
```

Now you can enhance the `TextView` with this plugin by doing this in the `pageLoaded` event you've defined in the `<Page>` tag above:

```js
import { NumericKeyboard } from "nativescript-numeric-keyboard";

export function pageLoaded(args: observable.EventData) {
  let page = <pages.Page>args.object;
  let textView = <TextView>page.getViewById("myTextView");
  // or even textView.ios

  // this is an example with all possible properties, not that they make sense combined :)
  new NumericKeyboard().decorate({
    textView: textView,
    returnKeyTitle: "Go!",
    locale: "en_US", // or "nl_NL", or any valid locale really (to define the decimal char)
    noReturnKey: true,
    noDecimals: true,
    noIpadInputBar: true // suppress the bar with buttons iOS renders on iPad since iOS 9
  });
}
```

Note that you really need to use a `TextView`, not a `TextField` for this to work as rendering the keyboard works fine, but getting its value just seems to get messed up when we set a different keyboard view. Shouldn't be a problem though, just something to keep in mind.

Also note that on Android you'll just get a numeric keyboard as usual (since we specified `keyboardType="number"`).
