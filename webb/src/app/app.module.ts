import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./component/app/app.component";
import { CoreService } from "./service/core.service";
import { HttpClientModule } from "@angular/common/http";
import { ViewportComponent } from "./component/viewport/viewport.component";

@NgModule({
  declarations: [AppComponent, ViewportComponent],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [CoreService],
  bootstrap: [AppComponent]
})
export class AppModule {}
