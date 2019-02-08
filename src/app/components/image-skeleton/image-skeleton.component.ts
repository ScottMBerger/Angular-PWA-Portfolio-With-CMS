import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
} from "@angular/core";


@Component({
  selector: "app-image-skeleton",
  templateUrl: "./image-skeleton.component.html",
  styleUrls: ["./image-skeleton.component.scss"]
})
export class ImageSkeletonComponent implements OnInit, AfterContentInit {
  @Input() src;
  loaded = false;
  constructor() { }

  ngAfterContentInit() {
    this.loaded = true;
  }
  ngOnInit() {
  }

  onLoad() {
  }

}
