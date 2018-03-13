import SlideShow from './includes/SlideShow';

const slideShow = () => {
    const slideShowElems = document.querySelectorAll('[data-slideshow]');

    if (!slideShowElems.length) {
        return;
    }

    slideShowElems.forEach(slideShowElem => {
        const slideShow = SlideShow(slideShowElem);
        slideShow.init();
    });
};

export default slideShow;
