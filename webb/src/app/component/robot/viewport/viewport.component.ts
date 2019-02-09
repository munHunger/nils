import { Component, Input, Output, EventEmitter } from "@angular/core";

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

  @Output()
  private newPos = new EventEmitter();

  @Output()
  private newPath = new EventEmitter();

  @Input()
  private title: string;

  @Input()
  private ortographic = [true, true, false];

  @Input()
  private pathPoints = [];

  @Input()
  private path = [];

  private getPoints(): number[][][] {
    const res = [[[0, 0, 0]]];
    res[0].push(this.projectPoint(this.data[0].pos));
    for (let i = 1; i < this.data.length; i++)
      res.push(
        [this.data[i - 1].pos, this.data[i].pos].map(p => this.projectPoint(p))
      );
    return res;
  }

  private getPath(): number[][][] {
    if (this.path.length == 0) return [];
    const res = [];
    for (let i = 1; i < this.path.length; i++)
      res.push([this.path[i - 1], this.path[i]].map(p => this.projectPoint(p)));
    return res;
  }

  private getPathPoints(): number[][] {
    return this.pathPoints.map(p => this.projectPoint(p));
  }

  private projectPoint(point): number[] {
    return point
      .map((v, i) => (this.ortographic[i] ? v : undefined))
      .filter(v => v);
  }

  private onRightClick($event) {
    this.newPath.emit(this.mapTo3D([$event.offsetX, $event.offsetY]));
    return false;
  }

  private onClick($event) {
    this.newPos.emit(this.mapTo3D([$event.offsetX, $event.offsetY]));
  }

  private mapTo3D(point): number[] {
    point = point.map(x => (x - 200) / 3);
    return this.ortographic.reduce((acc, val, index) => {
      acc.push(
        val ? point.shift() : this.data[this.data.length - 1].pos[index]
      );
      return acc;
    }, []);
  }
}
