import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./component/app/app.component";
import { CoreService } from "./service/core.service";
import { HttpClientModule } from "@angular/common/http";
import { ViewportComponent } from "./component/robot/viewport/viewport.component";
import { FaceComponent } from "./component/face/face.component";
import { RobotComponent } from "./component/robot/robot.component";
import { SceneComponent } from "./component/robot/scene/scene.component";
import { SlidersComponent } from "./component/robot/sliders/sliders.component";

@NgModule({
  declarations: [
    AppComponent,
    ViewportComponent,
    FaceComponent,
    RobotComponent,
    SceneComponent,
    SlidersComponent
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [CoreService],
  bootstrap: [AppComponent]
})
export class AppModule {}
