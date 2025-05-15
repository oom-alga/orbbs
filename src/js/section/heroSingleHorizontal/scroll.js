// import { getLenis } from './components/lenis';
import { getLenis } from "../../components/lenis";


const scroll = (selector) => {
    const instance = {
        init() {
            const tableContainer = document.querySelector(selector);
            if (!tableContainer) return this;
            

            // Variabel untuk mengontrol smooth scrolling
            let currentScrollLeft = 0;
            let targetScrollLeft = 0;
            let scrolling = false;
            
            // Mendapatkan instance Lenis yang sudah ada
            const lenis = getLenis();

            // Fungsi untuk smooth scrolling horizontal
            function smoothScroll() {
                const scrollDistance = targetScrollLeft - currentScrollLeft;
                currentScrollLeft += scrollDistance * 0.1; // Faktor smoothing
                
                tableContainer.scrollLeft = currentScrollLeft;
                
                if (Math.abs(targetScrollLeft - currentScrollLeft) > 0.5) {
                    requestAnimationFrame(smoothScroll);
                } else {
                    scrolling = false;
                }
            }

            // Event listener untuk wheel event
            document.body.addEventListener('wheel', function(event) {
                event.preventDefault();
                
                // Update target scroll position
                targetScrollLeft += event.deltaY;
                
                // Pastikan tidak scroll melewati batas
                const maxScrollLeft = tableContainer.scrollWidth - tableContainer.clientWidth;
                targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
                
                // Mulai smooth scrolling jika belum berjalan
                if (!scrolling) {
                    scrolling = true;
                    smoothScroll();
                }
            }, { passive: false });

            // Implementasi Drag and Drop untuk scrolling horizontal
            let isDragging = false;
            let startX;
            let scrollLeft;
            let dragThreshold = 5;
            let dragDistance = 0;
            let clickedElement = null;

            // Event listeners untuk drag and drop
            tableContainer.addEventListener('mousedown', (e) => {
                // Simpan elemen yang diklik
                clickedElement = e.target;
                
                // Periksa apakah klik terjadi pada area yang bisa di-drag
                // Hindari memulai drag pada elemen interaktif
                const isInteractive = e.target.closest('a, button, input, select, textarea, [role="button"], [tabindex]');
                if (!isInteractive) {
                    startX = e.pageX - tableContainer.offsetLeft;
                    scrollLeft = tableContainer.scrollLeft;
                    dragDistance = 0;
                    isDragging = true;
                    tableContainer.style.cursor = 'grabbing';
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const x = e.pageX - tableContainer.offsetLeft;
                const walk = (x - startX);
                dragDistance = Math.abs(walk);
                
                if (dragDistance > dragThreshold) {
                    // Mencegah event click jika user sedang drag
                    if (clickedElement) {
                        clickedElement.addEventListener('click', preventClickDuringDrag, { once: true });
                    }
                    
                    tableContainer.classList.add('dragging');
                    document.body.style.userSelect = 'none';
                    
                    targetScrollLeft = scrollLeft - walk * 2;
                    
                    const maxScrollLeft = tableContainer.scrollWidth - tableContainer.clientWidth;
                    targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
                    
                    if (!scrolling) {
                        scrolling = true;
                        smoothScroll();
                    }
                }
            });

            // Fungsi untuk mencegah click setelah drag
            function preventClickDuringDrag(e) {
                e.preventDefault();
                e.stopPropagation();
                // Hapus event listener setelah digunakan
                this.removeEventListener('click', preventClickDuringDrag);
            }

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    tableContainer.classList.remove('dragging');
                    tableContainer.style.cursor = '';
                    document.body.style.userSelect = '';
                    
                    // Jika drag distance kecil, ini dianggap sebagai klik
                    if (dragDistance <= dragThreshold && clickedElement) {
                        clickedElement.removeEventListener('click', preventClickDuringDrag);
                    }
                    
                    clickedElement = null;
                }
            });

            // Mencegah default drag behavior pada tabel
            tableContainer.addEventListener('dragstart', (e) => {
                if (isDragging) {
                    e.preventDefault();
                }
            });
            
            return this;
        }
    };
    return instance.init();
};

export { scroll };