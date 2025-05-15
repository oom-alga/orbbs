import gsap from "gsap";

/**
 * Simple AJAX navigation with GSAP animations
 * @param {Object} options - Configuration options
 * @returns {Object} - Control methods
 */
const fetchApiDefault = (options = {}) => {
    // Default options
    const config = {
        trigger: "a.ajaxLink",
        updateUrl: true,
        dellayData: 1000,
        container: "#contentMain",
        errorPage: "404.html",
        onRequest: function() {},
        onComplete: function() {}
    };

    // Merge options
    Object.assign(config, options);

    // Setup navigation
    const init = () => {
        // Add click events to links
        document.querySelectorAll(config.trigger).forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return;
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('href');
                loadPage(page);
                
                if (config.updateUrl) {
                    history.pushState({page}, '', page);
                }
            });
        });
        
        // Handle back/forward buttons
        if (config.updateUrl) {
            window.addEventListener('popstate', function(e) {
                if (e.state && e.state.page) {
                    loadPage(e.state.page);
                }
            });
        }
    };



    // Load page content
    const loadPage = (page) => {
        // Call onRequest callback
        config.onRequest();
        
        // Show loader
        console.log("Show Loader");
        

        // Fetch page content
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    return fetch(config.errorPage).then(r => r.text());
                }
                return response.text();
            })
            .then(html => {
                // Parse HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector(config.container).innerHTML;
                
                // Update title
                document.title = doc.title;
                
                // Animate out current content
                const contentDiv = document.querySelector(config.container);
                gsap.to(contentDiv, {
                    opacity: 0,
                    // y: -20,
                    duration: 0.3,
                    onComplete: () => {
                        // Update content
                        contentDiv.innerHTML = newContent;
                        
                        // Add delay if specified
                        setTimeout(() => {
                            // Hide loader
                            console.log("hide Loader");

                            // Animate in new content
                            gsap.fromTo(contentDiv, 
                                { opacity: 0 },
                                { 
                                    opacity: 1, 
                                    duration: 0.5,
                                    onComplete: config.onComplete
                                }
                            );
                        }, config.dellayData);
                    }
                });
            })
            .catch(error => {
                console.error('Navigation error:', error);
                console.log("hide Loader");
                
                const contentDiv = document.querySelector(config.container);
                contentDiv.innerHTML = `<div class="error-message">
                    <h2>Error</h2>
                    <p>${error.message}</p>
                </div>`;
            });
    };


    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    return {
        navigate: loadPage,
        refresh: () => {
            const currentPath = window.location.pathname;
            const pageName = currentPath.split('/').pop() || 'index.html';
            loadPage(pageName);
        }
    };
};

export { fetchApiDefault };