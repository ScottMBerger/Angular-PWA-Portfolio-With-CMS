import { AppStateService } from "./../../providers/app-state.service";
import { Observable } from "rxjs";
import { RequestService } from "../../providers/request.service";
import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-doc-container",
  templateUrl: "./doc-container.component.html",
  styleUrls: ["./doc-container.component.scss"]
})
export class DocContainerComponent implements OnInit {
  imageList = [{ file: "one" }, { file: "two" }, { file: "three" }];
  @Input("id")
  id;
  imgurData$: Observable<any>;
  projects = this.appState.get("cms").projects;

  constructor(
    private request: RequestService,
    private sanitize: DomSanitizer,
    private appState: AppStateService
  ) {
    console.log("got projects", this.projects);
  }

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

  ngOnInit() {
    this.imgurData$ = this.request.get(this.id);
  }
}
