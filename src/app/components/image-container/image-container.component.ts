import { Observable } from "rxjs";
import { RequestService } from "../../providers/request.service";
import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-image-container",
  templateUrl: "./image-container.component.html",
  styleUrls: ["./image-container.component.scss"]
})
export class ImageContainerComponent implements OnInit {
  imageList = [{ file: "one" }, { file: "two" }, { file: "three" }];
  @Input() id;
  imgurData$: Observable<any>;
  constructor(
    private request: RequestService,
    private sanitize: DomSanitizer
  ) { }

  style(img) {
    const res = {
      width: this.sanitizer((img.width * 200) / img.height + "px"),
      "flex-grow": this.sanitizer((img.width * 200) / img.height + "px")
    };
    return res;
  }

  sanitizer(str) {
    return this.sanitize.bypassSecurityTrustStyle(str);
  }

  ngOnInit() {
    this.imgurData$ = this.request.get(this.id);
  }
}
