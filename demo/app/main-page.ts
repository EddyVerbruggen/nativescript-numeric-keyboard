import { TextField } from "tns-core-modules/ui/text-field";
import { EventData } from "tns-core-modules/data/observable";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { isIOS, Page } from "tns-core-modules/ui/page";
import { HelloWorldModel } from "./main-view-model";
import { NumericKeyboard } from "nativescript-numeric-keyboard";

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: EventData) {
  let page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const textField = <TextField>page.getViewById("defaultPluginKeyboard");
  new NumericKeyboard().decorate({
    textField: textField,
    returnKeyTitle: "Go!",
    locale: "en_US",
    noDecimals: true,
    noIpadInputBar: true
  });

  if (isIOS) {
    const searchBar = <SearchBar>page.getViewById("searchBar");

    searchBar.on("textChange", (args: EventData) => {
      let sb = <SearchBar>args.object;
      console.log("searchBar, text entered: " + sb.text);
    });

    const textFieldContainerSubviews = searchBar.ios.subviews.objectAtIndex(0).subviews;
    if (textFieldContainerSubviews.count > 1) {
      new NumericKeyboard().decorate({
        textField: textFieldContainerSubviews.objectAtIndex(1),
        noReturnKey: true,
        noDecimals: true,
        noIpadInputBar: true
      });
    }
  }
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
