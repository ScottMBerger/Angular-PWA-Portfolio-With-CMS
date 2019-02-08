import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appBgLoader]'
})
export class BgLoaderDirective implements OnInit {
    @Input('appBgLoader') image;
    backgroundSrc: string;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.loadImage()
    }

    loadImage() {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!isSafari && this.image.webp) {
            this.backgroundSrc = this.image.webp;
        } else if (isSafari && this.image.jp2) {
            this.backgroundSrc = this.image.jp2
        } else {
            this.backgroundSrc = this.image.src
        }

        const curImg = new Image();
        curImg.src = this.backgroundSrc;
        curImg.onload = () => {
            this.el.nativeElement.style.backgroundImage = `url( ${this.backgroundSrc} )`
        }
    }
}