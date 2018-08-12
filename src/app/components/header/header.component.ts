import { CmsService } from "./../../providers/cms.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  content$ = this.cms.content$;
  constructor(private cms: CmsService) {}

  ngOnInit() {}
}
