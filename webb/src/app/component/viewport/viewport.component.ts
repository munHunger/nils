import { Component, Input } from "@angular/core";

@Component({
  selector: "viewport",
  templateUrl: "./viewport.component.html",
  styleUrls: ["./viewport.component.scss"]
})
export class ViewportComponent {
  @Input()
  private data = [
    {
      pos: [0, 0, 0]
    }
  ];

  @Input()
  private title: string;

  @Input()
  private ortographic = [true, true, false];

  private getPoints(): number[][][] {
    const res = [[[0, 0, 0]]];
    res[0].push(this.projectPoint(this.data[0].pos));
    for (let i = 1; i < this.data.length; i++)
      res.push(
        [this.data[i - 1].pos, this.data[i].pos].map(p => this.projectPoint(p))
      );
    return res;
  }

  private projectPoint(point) {
    return point
      .map((v, i) => (this.ortographic[i] ? v : undefined))
      .filter(v => v);
  }
}
