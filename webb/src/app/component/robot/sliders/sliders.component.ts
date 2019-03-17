import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "sliders",
  templateUrl: "./sliders.component.html",
  styleUrls: ["./sliders.component.scss"]
})
export class SlidersComponent {
  private position = [0, 0, 0];

  @Output()
  private newPos = new EventEmitter();

  public change() {
    this.newPos.emit(this.position);
  }
}
