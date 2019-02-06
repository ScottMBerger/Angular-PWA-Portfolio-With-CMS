import { CmsService } from "../../providers/cms.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  @Input() content;
  constructor(private cms: CmsService) { }

  ngOnInit() { }
}
