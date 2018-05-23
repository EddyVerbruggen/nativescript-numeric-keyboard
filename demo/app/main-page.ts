import * as observable from "data/observable";
import * as pages from "ui/page";
import { HelloWorldModel } from "./main-view-model";
import { NumericKeyboard } from "nativescript-numeric-keyboard";
import { TextField } from "tns-core-modules/ui/text-field";
import { EventData } from "tns-core-modules/data/observable";

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  let page = <pages.Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const textField = <TextField>page.getViewById("defaultPluginKeyboard");

  new NumericKeyboard().decorate({
    textField: textField,
    returnKeyTitle: "Go!",
    locale: "en_US",
    noDecimals: true,
    noIpadInputBar: true
  });
}

export function onMyTextLoaded(args: EventData) {
  args.object.on("textChange", (args: EventData) => {
    let numkey = <TextField>args.object;
    console.log("onMyTextLoaded, text entered: " + numkey.text);
  });
}

export function onMyTextLoadedPluginCode(args: EventData) {
  args.object.on("textChange", (args: EventData) => {
    let numkey = <TextField>args.object;
    console.log("onMyTextLoadedPluginCode, text entered: " + numkey.text);
  });
}

export function onMyTextLoadedPluginView(args: EventData) {
  args.object.on("textChange", (args: EventData) => {
    let numkey = <TextField>args.object;
    console.log("onMyTextLoadedPluginCode, text entered: " + numkey.text);
  });
}
