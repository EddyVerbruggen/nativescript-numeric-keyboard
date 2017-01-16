import { EventData, Observable } from 'data/observable';
import { TextField } from "ui/text-field";
import { TextView } from "ui/text-view";

export class HelloWorldModel extends Observable {
  constructor() {
    super();
  }
  public myText: number = 1234;
  public myTextPlugin: number = 2345;
  public myTextViewPlugin: number = 3456;

  public onPropertyChange(args: EventData) {
    let numkey = <TextField>args.object;
    console.log("Entered text a: " + numkey.text);
  }

  public onPropertyChangePlugin(args: EventData) {
    let numkey = <TextField>args.object;
    console.log("Entered text b: " + numkey);
  }

  public onPropertyChangeViewPlugin(args: EventData) {
    let numkey = <TextView>args.object;
    console.log("Entered text c: " + numkey.text);
  }

  public onSubmit() {
    console.log("Value of this.myText: " + this.myText);
    console.log("Value of this.myTextPlugin: " + this.myTextPlugin);
    console.log("Value of this.myTextViewPlugin: " + this.myTextViewPlugin);
  }
}