import { scroll } from "./scroll.js";

const sectionSingleHorizontal = () => {
    if(document.querySelector('.sectionSpecialSingleHorizontal')){
        console.log("%c    Single Horizontal", 'color:rgb(255, 81, 0)');
        scroll('.sectionSpecialSingleHorizontal');
    }
}

export {
    sectionSingleHorizontal
}
