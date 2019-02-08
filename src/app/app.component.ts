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
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit {
  content$ = this.cms.content$;
  backgroundUrl: SafeStyle;
  backgroundSrc: string;
  deferredPrompt;
  bgLoaded = false;
  showPWADownload = false;
  showUpdate = false;
  backgroundImage;

  constructor(
    private cms: CmsService,
    private titleService: Title,
    private metaService: Meta,
    private elementRef: ElementRef,
    private santizer: DomSanitizer,
    private appState: AppStateService,
    private updates: SwUpdate
  ) {
    updates.available.subscribe(event => {
      this.showUpdate = true;
    });
  }

  loaded() {
    console.log('loadeded bg')
  }
  ngOnInit() {
    this.cms.content$.subscribe(res => this.initMetaAndStyles(res));

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      // // Prevent Chrome 67 and earlier from automatically showing the prompt
      // // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      setTimeout(() => {
        this.showPWADownload = true;
      }, 30000)
    });
  }

  installTapped() {
    this.showPWADownload = false;
    this.deferredPrompt.prompt()
  }

  updateTapped() {
    this.showUpdate = false;
    this.updates.activateUpdate().then(() => document.location.reload());
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

    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = res.icons[1].src;
    document.head.appendChild(link);

    this.backgroundImage = res.backgroundImage
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari && res.backgroundImage.webp) {
      this.backgroundSrc = res.backgroundImage.webp;

    } else if (isSafari && res.backgroundImage.jp2) {
      this.backgroundSrc = res.backgroundImage.jp2
    } else {
      this.backgroundSrc = res.backgroundImage.src
    }
    this.backgroundUrl = this.santizer.bypassSecurityTrustStyle(
      `url( ${this.backgroundSrc} )`
    );
    const styles = [
      'border-radius: 100px',
      'font-size: 24px',
      'padding: 20px',
      'padding-left: 40px',
      'padding-right: 40px',
      'color: rgba(255, 255, 255, 0.9)',
      'background: ' + res.theme_color,
      'box-shadow: 0 2px 4px 0 rgba(115,101,97,.27)'
    ].join(';');
    console.log('%c ' + res.title, styles);
    window['prerenderReady'] = true;
  }
}
