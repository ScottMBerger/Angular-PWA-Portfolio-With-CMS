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
import { AppStateService } from "./providers/app-state.service";

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
    private santizer: DomSanitizer,
    private appState: AppStateService
  ) { }

  ngOnInit() {
    this.cms.content$.subscribe(res => this.initMetaAndStyles(res));

    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      deferredPrompt.prompt();
    });
  }

  initMetaAndStyles(res) {
    this.appState.set("cms", res);
    this.titleService.setTitle(res.title);
    this.metaService.addTags([
      { name: "theme-color", content: res.theme_color },
      { name: "description", content: res.googleDescription },
      { name: "keywords", content: res.keywords }
    ]);
    this.elementRef.nativeElement.style.setProperty(
      "--theme-color",
      res.theme_color
    );
    this.backgroundUrl = this.santizer.bypassSecurityTrustStyle(
      `url( ${res.backgroundUrl} )`
    );
    window['prerenderReady'] = true;
  }
}
