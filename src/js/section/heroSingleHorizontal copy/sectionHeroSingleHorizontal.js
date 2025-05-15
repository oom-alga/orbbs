import gsap from "gsap";
import { hover } from "./hover";
import { scroll } from "./scroll";

const sectionHeroSingleHorizontal = () => {
    if(document.querySelector('.hero-singleHorizontal')){
        console.log("%c    Base Hero Single Horizontal", 'color:rgb(255, 81, 0)');
        let mm = gsap.matchMedia();

        // mm.add("(max-width: 767px)", () => {
        // });
        
        mm.add("(min-width: 768px)", () => {
            hover('.hero-singleHorizontal .projectListHorizontal__lists-list');
            scroll('.hero-singleHorizontal');
        });
    }
}

export {
    sectionHeroSingleHorizontal
}
