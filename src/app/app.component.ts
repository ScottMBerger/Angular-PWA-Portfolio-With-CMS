import { CmsService } from "./providers/cms.service";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef
} from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {
  constructor(
    private cms: CmsService,
    private titleService: Title,
    private metaService: Meta,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.cms.getLocalFile().subscribe(res => {
      this.titleService.setTitle(res.title);
      this.metaService.addTag({
        property: "description",
        content: res.googleDescription
      });
      this.elementRef.nativeElement.style.setProperty(
        "--theme-color",
        res.themeColor
      );
    });
  }
}
