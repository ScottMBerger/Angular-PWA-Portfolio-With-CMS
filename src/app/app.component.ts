import { CmsService } from "./providers/cms.service";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef
} from "@angular/core";
import {
  Title,
  Meta,
  DomSanitizer,
  SafeStyle
} from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {
  content$ = this.cms.content$;
  backgroundUrl: SafeStyle;

  constructor(
    private cms: CmsService,
    private titleService: Title,
    private metaService: Meta,
    private elementRef: ElementRef,
    private santizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.cms.content$.subscribe(res => this.initMetaAndStyles(res));
  }

  initMetaAndStyles(res) {
    this.titleService.setTitle(res.title);
    this.metaService.addTags([
      { name: "theme-color", content: res.themeColor },
      { name: "description", content: res.googleDescription },
      { name: "keywords", content: res.keywords }
    ]);
    this.elementRef.nativeElement.style.setProperty(
      "--theme-color",
      res.themeColor
    );
    this.backgroundUrl = this.santizer.bypassSecurityTrustStyle(
      `url( ${res.backgroundUrl} )`
    );
  }
}
