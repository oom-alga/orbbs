import $ from "jquery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const scroll = (selector) => {
    const instance = {
        init() {
            const tracks = document.querySelectorAll(selector);
            tracks.forEach((track, i) => {
                let trackWrapper = track.querySelectorAll(".track");
                let allImgs = track.querySelectorAll(".list");

                let trackWrapperWidth = () => {
                    let width = 0;
                    trackWrapper.forEach(el => width += el.offsetWidth);
                    return width;
                }

                gsap.defaults({
                    ease: "none"
                })

                let scrollTween = gsap.to(trackWrapper, {
                    x: () => -trackWrapperWidth() + window.innerWidth,
                    scrollTrigger: {
                        trigger: track,
                        pin: true,
                        scrub: 1,
                        start: "center center",
                        end: () => "+=" + (track.scrollWidth - window.innerWidth),
                        invalidateOnRefresh: true,
                        id: "id-one"
                    },
                });

            });
            
            return this;
        }
    };

    return instance.init();
    
};

export { scroll };