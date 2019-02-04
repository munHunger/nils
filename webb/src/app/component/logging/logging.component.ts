import { Component } from "@angular/core";
import { CoreService } from "src/app/service/core.service";

@Component({
  selector: "logging",
  templateUrl: "./logging.component.html",
  styleUrls: ["./logging.component.scss"]
})
export class LoggingComponent {
  private logs = [];
  constructor(private service: CoreService) {
    service.getLogs().subscribe(res => (this.logs = res));
    setTimeout(() => this.updateLogs(), 1000);
  }

  private updateLogs() {
    this.service
      .getLogsFromHash(this.logs[this.logs.length - 1].hash)
      .subscribe(res => {
        res.forEach(log => this.logs.push(log));
        setTimeout(() => this.updateLogs(), 1000);
      });
  }
}
