import { Component, OnInit, Input, HostBinding } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-image-box",
  templateUrl: "./image-box.component.html",
  styleUrls: ["./image-box.component.css"]
})
export class ImageBoxComponent implements OnInit {
  @HostBinding("style.backgroundColor") bg: any;
  @HostBinding("style.width") width: any;
  @HostBinding("style.flexGrow") grow: any;
  @Input("data") data;
  constructor(private sanitize: DomSanitizer) {}

  ngOnInit() {
    this.bg = "green";
    this.grow = (this.data.width * 200) / this.data.height;
    this.width = this.grow + "px";
  }

  sanitizer(str: string) {
    return this.sanitize.bypassSecurityTrustStyle(str);
  }
}
