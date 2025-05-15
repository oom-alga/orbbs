import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const animationBasic = () => {
    if(document.querySelector('.scaleFullScreen')){

        console.log("Animation Basic");

        // Set overflow awal
        gsap.set(".scaleFullScreen", {
            overflow: 'hidden'
        });

        // Common ScrollTrigger settings
        const scrollTriggerSettings = {
            trigger: "body",
            start: "top top",
            end: "top+=700 25%",
            // markers: true,
            scrub: 1
        };

        // Animasi container
        gsap.to(".scaleFullScreen", {
            maxWidth: '100dvw',
            paddingLeft: 0,
            paddingRight: 0,
            scrollTrigger: scrollTriggerSettings
        });

        // Animasi gambar
        gsap.to(".scaleFullScreen img", {
            scale: 1.2,
            scrollTrigger: scrollTriggerSettings
        });

    }
}

const lerping = () => {
    console.log("Animation Lerping");

    let delSections = document.querySelectorAll(".lerp-vertical");

    delSections.forEach(section => {

        let imageAnim = gsap.to(section.querySelector(".lerp-vertical__animation"), {
            y: "-100vh",
            ease: "none",
            paused: true
        });

        let progressTo = gsap.quickTo(imageAnim, "progress", {
            ease: "power3",
            duration: parseFloat(section.dataset.scrub) || 0.1
        });

        gsap.to(section.querySelector(".lerp-vertical__container"), {
            y: "100vh",
            ease: "none",
            scrollTrigger: {
                scrub: true,
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                onUpdate: self => progressTo(self.progress)
            }
        });

    });
}


export {
    animationBasic,
    lerping
}