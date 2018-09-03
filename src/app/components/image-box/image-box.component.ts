import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  ElementRef,
  ViewChild
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
  styleUrls: ["./image-box.component.scss"],
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
  @HostBinding("style.width")
  width: any;
  @HostBinding("style.flexGrow")
  grow: any;
  @Input("data")
  data;
  @ViewChild("modalInner")
  modalInner;
  showFull = false;
  state = "hide";

  constructor(private sanitize: DomSanitizer, public el: ElementRef) {}

  ngOnInit() {
    this.data.width = this.data.width || 55;
    this.data.height = this.data.height || 55;
    this.grow = (this.data.width * 200) / this.data.height;
    this.width = this.grow + "px";
  }

  sanitizer(str: string) {
    return this.sanitize.bypassSecurityTrustStyle(str);
  }

  close(event) {
    console.log(event);
    console.log(this.modalInner.nativeElement.contains(event.target));
    if (!this.modalInner.nativeElement.contains(event.target)) {
      this.showFull = false;
    }
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
