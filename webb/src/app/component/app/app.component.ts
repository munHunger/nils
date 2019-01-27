import { Component } from "@angular/core";
import { CoreService } from "src/app/service/core.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  result = [];
  private data = {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 3,
      y: 0
    },
    jointLengths: [5, 5]
  };

  constructor(private coreService: CoreService) {
    coreService.getIK(this.data).subscribe(res => (this.result = res));
  }

  private send() {
    this.coreService.getIK(this.data).subscribe(res => (this.result = res));
  }
}
