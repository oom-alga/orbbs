import gsap from "gsap";

const loaderIn = () => {
    console.clear();
    console.log("loaderIn");
    gsap.to(".loader", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });
};

const loaderOut = () => {
    console.log("loaderOut");
    gsap.to(".loader", {
        opacity: 0,
        duration: 1,
        delay: 1,
        pointerEvents: "none",
        ease: "power2.out"
    });
};

export {
    loaderIn,
    loaderOut
};