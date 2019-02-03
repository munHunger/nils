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

  private getPoints(): number[][][] {
    const res = [[[0, 0, 0]]];
    res[0].push(this.data[0].pos);
    for (let i = 1; i < this.data.length; i++)
      res.push([this.data[i - 1].pos, this.data[i].pos]);
    return res;
  }
}
