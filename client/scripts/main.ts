import 'reflect-metadata';
import {Component, View, bootstrap} from 'angular2/angular2';
@Component({
  selector: 'my-app'
})
@View({
  template: `<h1>My first Angular 2 App</h1>`
})
class AppComponent {
  private name:string;

  constructor(){
    this.name = "My-App";
  }
}
bootstrap(AppComponent);
