import { Component } from "@angular/core";
import { CoreService } from "src/app/service/core.service";

@Component({
  selector: "robot",
  templateUrl: "./robot.component.html",
  styleUrls: ["./robot.component.scss"]
})
export class RobotComponent {
  result = [];

  private pathPoints = [];

  private path = [];

  constructor(private coreService: CoreService) {
    coreService.position([20, 15, 10]).subscribe(res => (this.result = res));
  }

  private step() {
    this.coreService.step().subscribe(res => (this.result = res));
  }

  private moveRobot($event) {
    console.log($event);
    if (this.path.length > 0)
      this.coreService.addPath(this.path).subscribe(() => (this.path = []));
    else
      this.coreService.position($event).subscribe(res => (this.result = res));
  }

  private addPathPoint(point) {
    this.pathPoints.push(point);
    if (this.pathPoints.length == 4) {
      this.coreService.getBezier(this.pathPoints).subscribe(res => {
        this.path = res;
        this.pathPoints = [];
      });
    }
  }
}
