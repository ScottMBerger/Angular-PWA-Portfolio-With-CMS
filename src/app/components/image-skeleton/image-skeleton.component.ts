import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  ElementRef,
  ViewChild
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-image-skeleton",
  templateUrl: "./image-skeleton.component.html",
  styleUrls: ["./image-skeleton.component.scss"],
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
export class ImageSkeletonComponent implements OnInit {
  // @HostBinding("style.width")
  @Input() src;
  loaded = false;

  constructor() { }

  ngOnInit() {
    console.log('image src', this.src)
  }

  onLoad() {
    this.loaded = true;
  }
}
