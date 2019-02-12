import { Directive, Input, ElementRef, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appBgLoader]'
})
export class BgLoaderDirective implements OnInit {
    @Input('appBgLoader') image;
    @Input() shine;
    @Output() load = new EventEmitter();
    loadInitialize = false;
    backgroundSrc: string;
    intersection: IntersectionObserver;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {
        if (this.shine) {
            this.renderer.addClass(this.el.nativeElement, 'shine');
        }
        this.startObserver()
    }

    startObserver() {
        this.intersection = new IntersectionObserver(
            entries => {
                if (entries[0].intersectionRatio > 0) {
                    this.loadImage()
                    this.intersection.unobserve(this.el.nativeElement)
                }
            },
            {}
        );
        this.intersection.observe(this.el.nativeElement);
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
            if (this.shine) {
                this.renderer.removeClass(this.el.nativeElement, 'shine');
            }
            this.load.emit()
        }
    }
}