import gsap from "gsap";

const hover = (selector) => {

    
    const instance = {
        selector,
        
        init() {
            this.applyHoverEffect(this.selector);
            return this;
        },

        applyHoverEffect(selector) {
            const spans = document.querySelectorAll(selector);

            spans.forEach((span) => {
                // Simpan height asli
                span.originalHeight = span.offsetHeight;
                span.addEventListener('mousemove', (e) => this.handleMouseMove(e, spans));
                span.addEventListener('mouseleave', () => this.handleMouseLeave(spans));
            });
        },

        handleMouseMove(e, spans) {

            
            const hoveredSpan = e.target;
            
            // Pastikan target adalah span yang dimaksud
            if (!hoveredSpan.matches(this.selector)) {
                return;
            }


            const rect = hoveredSpan.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const scaleFactor = 0.2;

            const center = rect.width / 2;
            let heightMultiplier;

            if (mouseX < center) {
                heightMultiplier = (scaleFactor + 1) + (scaleFactor * mouseX) / center;
            } else {
                heightMultiplier = (scaleFactor + 1) + (scaleFactor * (rect.width - mouseX)) / center;
            }

            // Hitung height baru berdasarkan height asli
            const newHeight = hoveredSpan.originalHeight * heightMultiplier;

            gsap.to(hoveredSpan, {
                height: newHeight,
                duration: 0.5,
                ease: 'power4.out',
            });

            const spansArray = Array.from(spans);
            const hoveredIndex = spansArray.indexOf(hoveredSpan);


            // Reset semua span yang bukan tetangga langsung
            spansArray.forEach((span, index) => {
                if (index !== hoveredIndex && index !== hoveredIndex - 1 && index !== hoveredIndex + 1) {
                    gsap.to(span, {
                        height: span.originalHeight,
                        duration: 0.5,
                        ease: 'power4.out',
                    });
                }
            });

            // Hanya pengaruhi tetangga langsung
            const prevSpan = spansArray[hoveredIndex - 1];
            const nextSpan = spansArray[hoveredIndex + 1];

            if (prevSpan) {
                let distanceFromMouse = Math.abs(rect.left - e.clientX);
                distanceFromMouse = Math.min(distanceFromMouse, center);

                const scalePrev = 1 + (scaleFactor * (center - distanceFromMouse)) / center;
                const newPrevHeight = prevSpan.originalHeight * scalePrev;

                gsap.to(prevSpan, {
                    height: newPrevHeight,
                    duration: 0.5,
                    ease: 'power4.out',
                });
            }

            if (nextSpan) {
                let distanceFromMouse = Math.abs(rect.right - e.clientX);
                distanceFromMouse = Math.min(distanceFromMouse, center);

                const scaleNext = 1 + (scaleFactor * (center - distanceFromMouse)) / center;
                const newNextHeight = nextSpan.originalHeight * scaleNext;

                gsap.to(nextSpan, {
                    height: newNextHeight,
                    duration: 0.5,
                    ease: 'power4.out',
                });
            }
        },

        handleMouseLeave(spans) {
            spans.forEach((span) => {
                gsap.to(span, {
                    height: span.originalHeight,
                    duration: 0.5,
                    ease: 'power4.out',
                });
            });
        }
    };

    return instance.init();
};

export { hover };