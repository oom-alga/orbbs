import $ from 'jquery';

// Patch passive event listener sebelum mengimpor slick
(function() {
  // Simpan referensi asli dari addEventListener
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  
  // Override addEventListener
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    // Untuk event touch, paksa gunakan passive: true
    if (type === 'touchstart' || type === 'touchmove') {
      let newOptions = options;
      if (newOptions === undefined || newOptions === false) {
        newOptions = { passive: true };
      } else if (typeof newOptions === 'object') {
        newOptions.passive = true;
      }
      
      // Panggil metode asli dengan opsi yang dimodifikasi
      return originalAddEventListener.call(this, type, listener, newOptions);
    }
    
    // Untuk event lain, gunakan perilaku default
    return originalAddEventListener.call(this, type, listener, options);
  };
})();

// Impor slick setelah patch
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';

const sectionWorkSlider = () => {
    console.log("%c    Base Work Slider", 'color:rgb(0, 255, 34)');
    const slider = $('.testimonial-slider');

    slider.slick({
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        // slidesToScroll: auto,
        centerMode: true,
        variableWidth: true,
    });

    $('body').on('wheel', (function(e) {
        e.preventDefault();
      
        if (e.originalEvent.deltaY < 0) {
            slider.slick('slickPrev');
        } else {
            slider.slick('slickNext');
        }
      }));
}

export {
    sectionWorkSlider
}