import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-second",
  templateUrl: "./second.component.html",
  styleUrls: ["./second.component.scss"]
})
export class SecondComponent implements OnInit {
  @Input("content")
  content;

  constructor() {}

  ngOnInit() {}
}
