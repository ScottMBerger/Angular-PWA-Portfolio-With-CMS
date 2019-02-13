import { CmsService } from "../../providers/cms.service";
import { Component, OnInit, Input, HostListener } from "@angular/core";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  @Input() content;
  modal = false;
  scrollPos;
  constructor(private cms: CmsService) { }

  ngOnInit() { }

  open(content) {
    this.modal = content
    this.scrollPos = { x: window.scrollX, y: window.scrollY }
  }

  close(event) {
    this.modal = false;
  }

  @HostListener("window:scroll")
  checkScroll() {
    if (this.modal) {
      window.scrollTo(this.scrollPos.x, this.scrollPos.y)
    }
  }

  onDragStart(event) {
    console.log(`starting`, event);
  }

  onDrag(event) {
    console.log('dragging', event);
  }

  onDragEnd(event) {
    console.log('drag end', event);
  }

  openLink(url) {
    window.location.href = url;
  }
}
