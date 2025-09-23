/**
 * YouTube Embed Plugin JavaScript
 * Handles lazy loading of YouTube iframes
 */

(function() {
    'use strict';
    
    /**
     * Initialize YouTube embed functionality
     */
    function initYouTubeEmbeds() {
        const youtubeEmbeds = document.querySelectorAll('.youtube-embed__preview');
        
        youtubeEmbeds.forEach(function(preview) {
            // Skip if already initialized
            if (preview.hasAttribute('data-youtube-initialized')) {
                return;
            }
            
            preview.setAttribute('data-youtube-initialized', 'true');
            
            // Add click handler
            preview.addEventListener('click', handleEmbedClick);
            
            // Add keyboard support
            preview.addEventListener('keydown', handleEmbedKeydown);
            
            // Make it focusable and accessible
            preview.setAttribute('tabindex', '0');
            preview.setAttribute('role', 'button');
            preview.setAttribute('aria-label', 'Play YouTube video');
        });
    }
    
    /**
     * Handle click on YouTube embed preview
     */
    function handleEmbedClick(event) {
        event.preventDefault();
        loadYouTubeIframe(this);
    }
    
    /**
     * Handle keyboard interaction
     */
    function handleEmbedKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            loadYouTubeIframe(this);
        }
    }
    
    /**
     * Load the actual YouTube iframe
     */
    function loadYouTubeIframe(preview) {
        const container = preview.closest('.youtube-embed');
        let embedUrl = container.dataset.embedUrl;
        
        if (!embedUrl) {
            console.error('YouTube embed URL not found');
            return;
        }
        
        // Add autoplay=1 to ensure video starts playing immediately when clicked
        // This overrides the block setting since the user explicitly clicked to play
        const separator = embedUrl.includes('?') ? '&' : '?';
        embedUrl += separator + 'autoplay=1';
        
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.borderRadius = '8px';
        iframe.title = 'YouTube video player';
        
        // Add loading indicator
        iframe.style.background = '#000';
        
        // Instead of hiding the preview, replace its content
        // This maintains the container's padding-bottom height
        preview.innerHTML = '';
        preview.appendChild(iframe);
        
        // Remove click handlers and update classes
        preview.style.cursor = 'default';
        preview.removeEventListener('click', handleEmbedClick);
        preview.removeEventListener('keydown', handleEmbedKeydown);
        preview.removeAttribute('tabindex');
        preview.removeAttribute('role');
        preview.removeAttribute('aria-label');
        preview.classList.add('youtube-embed__loaded');
        
        // Focus the iframe for better accessibility
        iframe.focus();
    }
    
    /**
     * Initialize when DOM is ready
     */
    function onDOMReady() {
        initYouTubeEmbeds();
        
        // Re-initialize when new content is added (for AJAX-loaded content)
        if (window.MutationObserver) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Check if any new YouTube embeds were added
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) { // Element node
                                const embeds = node.querySelectorAll ? 
                                    node.querySelectorAll('.youtube-embed__preview') : [];
                                if (embeds.length > 0) {
                                    initYouTubeEmbeds();
                                }
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMReady);
    } else {
        onDOMReady();
    }
    
    // Expose public API
    window.YouTubeEmbed = {
        init: initYouTubeEmbeds,
        load: loadYouTubeIframe
    };
    
})();