import { Component } from "@angular/core";
import { CoreService } from "src/app/service/core.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  result = [];

  constructor(private coreService: CoreService) {
    console.log("constructing core service");
    coreService.getIK().subscribe(res => (this.result = res));
  }
}
