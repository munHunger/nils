import { Component, Input } from "@angular/core";

@Component({
  selector: "viewport",
  templateUrl: "./viewport.component.html",
  styleUrls: ["./viewport.component.scss"]
})
export class ViewportComponent {
  @Input()
  private lengths = [5, 5];
  @Input()
  private scale = 10;
  @Input()
  private rotations = [60, 60];

  private getJointTransform(index: number): string {
    return (
      "translate(" +
      this.lengths
        .slice(0, index)
        .map(l => l * this.scale)
        .reduce((acc, val) => (acc += val), 0) +
      " 0) rotate(" +
      (180 - this.rotations[index]) +
      " 0 0)"
    );
  }
}
