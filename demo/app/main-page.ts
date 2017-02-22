import * as observable from "data/observable";
import * as pages from "ui/page";
import { HelloWorldModel } from "./main-view-model";
import { NumericKeyboard } from "nativescript-numeric-keyboard";
import { TextView } from "ui/text-view";

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  let page = <pages.Page>args.object;
  page.bindingContext = new HelloWorldModel();

  let textView = <TextView>page.getViewById("defaultPluginKeyboard");

  new NumericKeyboard().decorate({
    textView: textView,
    returnKeyTitle: "Go!",
    locale: "en_US",
    noDecimals: true,
    noIpadInputBar: true
  });
}