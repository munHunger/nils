import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  HostListener
} from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "scene",
  templateUrl: "./scene.component.html",
  styleUrls: ["./scene.component.scss"]
})
export class SceneComponent implements AfterViewInit {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private cameraTarget: THREE.Vector3;
  public scene: THREE.Scene;

  public fieldOfView: number = 60;
  public nearClippingPane: number = 1;
  public farClippingPane: number = 1100;

  @ViewChild("canvas")
  private canvasRef: ElementRef;

  constructor() {
    this.render = this.render.bind(this);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxisHelper(200));

    var geometry = new THREE.BoxGeometry(5, 30, 5);
    geometry.center();
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);

    cube.translateY(15);
    cube.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), 5);
    //cube.lookAt(10, 10, 5);
    this.scene.add(cube);
  }

  private createCamera() {
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );

    // Set position and look at
    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    this.camera.lookAt(0, 0, 0);
    setTimeout(() => this.setCameraPosition(this.camera, 0), 100);
  }

  private setCameraPosition(camera, step) {
    camera.position.x = Math.cos((step % 1) * Math.PI * 2) * 100;
    camera.position.y = 100;
    camera.position.z = Math.sin((step % 1) * Math.PI * 2) * 100;
    camera.lookAt(0, 0, 0);
    this.render();
    setTimeout(() => this.setCameraPosition(this.camera, (step += 0.01)), 100);
  }

  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRendering() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x555555, 1);
    this.renderer.autoClear = true;

    let component: SceneComponent = this;

    (function render() {
      //requestAnimationFrame(render);
      component.render();
    })();
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  /* LIFECYCLE */
  ngAfterViewInit() {
    this.createScene();
    this.createCamera();
    this.startRendering();
  }
}
