import delegate from './delegate';

const SELECTORS = {
    slideShow: '[data-slideshow]',
    forward: '[data-slideshow-forward]',
    back: '[data-slideshow-back]',
    slide: '[data-slideshow-slide]',
};

export default class SlideShow {
    constructor(target, options) {
        if (!(target instanceof Element)) {
            throw('ERROR: target provided is not a DOM element.');
        }

        this.target = target;
        this.options = options || {};
        this.slides = target.querySelectorAll(SELECTORS.slide);
        this.slidesLength = this.slides.length;
        this.activeSlide = this.options.activeSlide || 0;
        this.activeModifier = this.options.activeModifier || 'slideshow__slide--active';
    }

    activateSlide(newSlide) {
        newSlide = newSlide || 0;
        this.activeSlide = (newSlide + this.slidesLength) % this.slidesLength;

        this.slides.forEach(slide => {
            slide.classList.remove(this.activeModifier);
        });

        this.slides[this.activeSlide].classList.add(this.activeModifier);
    }

    eventHandlers() {
        const self = this;
        delegate(this.target, 'click', '[data-slideshow-back]', () => {
            self.activateSlide(self.activeSlide-1);
        });
        delegate(this.target, 'click', '[data-slideshow-forward]', () => {
            self.activateSlide(self.activeSlide+1);
        });
    }

    init() {
        this.activateSlide();
        this.eventHandlers();
    }
};
