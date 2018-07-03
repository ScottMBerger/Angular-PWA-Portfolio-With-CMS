import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HeaderComponent } from "./components/header/header.component";
import { SecondComponent } from "./components/second/second.component";
import { ImageSectionComponent } from "./components/image-section/image-section.component";
import { ImageContainerComponent } from "./components/image-container/image-container.component";
import { ImageBoxComponent } from "./components/image-box/image-box.component";
import { HttpClientModule } from "@angular/common/http";
import { RequestService } from "./providers/request.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SecondComponent,
    ImageSectionComponent,
    ImageContainerComponent,
    ImageBoxComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule {}
