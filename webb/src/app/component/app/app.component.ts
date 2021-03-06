import { Component } from "@angular/core";
import { CoreService } from "src/app/service/core.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  result = [];
  private data = {
    target: {
      pos: [30, 15, 20],
      rot: [20, 20, 20]
    },
    joints: [
      {
        length: 1,
        rotAxis: [0, 0, 1]
      },
      {
        length: 15,
        rotAxis: [0, 1, 0]
      },
      {
        length: 1,
        rotAxis: [0, 0, 1]
      },
      {
        length: 15,
        rotAxis: [0, 1, 0]
      },
      {
        length: 1,
        rotAxis: [0, 0, 1]
      },
      {
        length: 15,
        rotAxis: [0, 1, 0]
      }
    ]
  };

  constructor(private coreService: CoreService) {
    coreService.getIK(this.data).subscribe(res => (this.result = res));
  }

  private step() {
    this.coreService.step().subscribe(res => (this.result = res));
  }

  private send() {
    this.coreService.getIK(this.data).subscribe(res => (this.result = res));
  }
}
