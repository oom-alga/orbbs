// Import SCSS
import '../scss/main.scss';

import { fetchApiDefault } from './ajax';
import { getLenis } from './components/lenis';

import { sectionHeroSingleHorizontal } from './section/heroSingleHorizontal/sectionHeroSingleHorizontal';




const loaderOutDefault = () => {
    getLenis();
    sectionHeroSingleHorizontal();
    console.log("%c=== Animation End ===", 'color:rgb(0, 255, 34)');
}

const loaderInDefault = () => {
    console.clear();
    console.log("%c=== Animation Start ===", 'color:rgb(255, 0, 0)');
}

loaderOutDefault();

fetchApiDefault({
    onRequest: function() {
        loaderInDefault();
        console.log("Api Request");
    },
    onComplete: function() {
        console.log("Api Complete");
        loaderOutDefault();
    }
});