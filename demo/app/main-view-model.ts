import { Observable } from "tns-core-modules/data/observable";

export class HelloWorldModel extends Observable {
  constructor() {
    super();
  }
  public myText: number = 123;
  public myTextPlugin: number = 234;
  public myTextFieldPlugin: number = 345;

  public onSubmit() {
    console.log("Value of this.myText: " + this.myText);
    console.log("Value of this.myTextPlugin: " + this.myTextPlugin);
    console.log("Value of this.myTextFieldPlugin: " + this.myTextFieldPlugin);
  }
}
