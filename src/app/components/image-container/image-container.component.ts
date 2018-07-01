import { RequestService } from "./../../providers/request.service";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-image-container",
  templateUrl: "./image-container.component.html",
  styleUrls: ["./image-container.component.css"]
})
export class ImageContainerComponent implements OnInit {
  imageList = [{ file: "one" }, { file: "two" }, { file: "three" }];
  imgurData$ = this.request.get("CPOMSX1#YF3m1b4");
  constructor(
    private request: RequestService,
    private sanitize: DomSanitizer
  ) {}

  style(img) {
    const res = {
      width: this.sanitizer((img.width * 200) / img.height + "px"),
      "flex-grow": this.sanitizer((img.width * 200) / img.height + "px")
    };
    console.log(res);
    return res;
  }
  sanitizer(str) {
    return this.sanitize.bypassSecurityTrustStyle(str);
  }
  ngOnInit() {}
}
