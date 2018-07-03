import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  ElementRef
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-image-box",
  templateUrl: "./image-box.component.html",
  styleUrls: ["./image-box.component.css"],
  animations: [
    trigger("scrollAnimation", [
      state(
        "show",
        style({
          opacity: 1,
          transform: "translateX(0)"
        })
      ),
      state(
        "hide",
        style({
          opacity: 0,
          transform: "translateX(-100%)"
        })
      ),
      transition("show => hide", animate("700ms ease-out")),
      transition("hide => show", animate("700ms ease-in"))
    ])
  ]
})
export class ImageBoxComponent implements OnInit {
  @HostBinding("style.width") width: any;
  @HostBinding("style.flexGrow") grow: any;
  @Input("data") data;
  state = "hide";

  constructor(private sanitize: DomSanitizer, public el: ElementRef) {}

  ngOnInit() {
    this.grow = (this.data.width * 200) / this.data.height;
    this.width = this.grow + "px";
  }

  sanitizer(str: string) {
    return this.sanitize.bypassSecurityTrustStyle(str);
  }

  @HostListener("window:scroll", ["$event"])
  checkScroll() {
    const componentPosition = this.el.nativeElement.getBoundingClientRect();
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > componentPosition.bottom) {
      this.state = "show";
    } else {
      this.state = "hide";
    }
  }
}
