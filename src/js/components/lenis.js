// utils/lenis-singleton.js
import Lenis from "lenis";

let instance = null;

export const createLenis = (options = {}) => {
    if (instance) return instance;

    instance = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options
    });

    // RAF loop
    let lastTime = 0;
    const rafLoop = (time) => {
        if (instance) {
            if (time - lastTime > 16) {
                instance.raf(time);
                lastTime = time;
            }
        }
        requestAnimationFrame(rafLoop);
    };

    requestAnimationFrame(rafLoop);

    return instance;
};

export const getLenis = () => {
    return instance || createLenis();
};

export const destroyLenis = () => {
    if (instance) {
        instance.destroy();
        instance = null;
    }
};
export const scrollToLoader = () => {
    const lenis = getLenis();
    if (lenis) {
        lenis.scrollTo("#main", {
            duration: 0,
        });
    }
};
export const scrollTo = (target, options = {}) => {
    const lenis = getLenis();
    if (lenis) {
        lenis.scrollTo(target, {
            offset: 0,
            duration: 1.5,
            immediate: false,
            ...options
        });
    }
};