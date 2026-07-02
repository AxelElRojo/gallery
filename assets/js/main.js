import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#my-gallery',
  children: 'a',
  pswpModule: () => import('https://unpkg.com/photoswipe/dist/photoswipe.esm.js'),
  
  // Add this block to force the 80% screen size
  paddingFn: (viewportSize) => {
    return {
      top: viewportSize.y * 0.1,    // 10% padding on top
      bottom: viewportSize.y * 0.1, // 10% padding on bottom
      left: viewportSize.x * 0.1,   // 10% padding on left
      right: viewportSize.x * 0.1   // 10% padding on right
    };
  }
});

// Register the custom caption UI
lightbox.on('uiRegister', function() {
  lightbox.pswp.ui.registerElement({
    name: 'custom-caption',
    order: 9,
    isButton: false,
    appendTo: 'root', // Keeps the caption fixed on the screen
    onInit: (el, pswp) => {
      pswp.on('change', () => {
        const currSlideElement = pswp.currSlide.data.element;
        if (currSlideElement) {
          const lens = currSlideElement.getAttribute('data-lens') || '';
          const stock = currSlideElement.getAttribute('data-stock') || '';
          const comment = currSlideElement.getAttribute('data-comment') || '';
          const tagsStr = currSlideElement.getAttribute('data-tags') || '';
          
          let tagsHtml = '';
          if (tagsStr) {
            tagsHtml = tagsStr.split(', ').map(tag => {
              // Formats the URL exactly how Hugo expects it
              const urlTag = tag.toLowerCase().replace(/\s+/g, '-');
              return `<a href="/tags/${urlTag}/" class="pswp-tag-link">#${tag}</a>`;
            }).join(' ');
          }
          
          el.innerHTML = `
            <div class="pswp-meta-bar">
              ${lens ? `<div class="pswp-meta-comment">${lens}</div>` : ''}
              ${comment ? `<div class="pswp-meta-comment">${comment}</div>` : ''}
              ${tagsHtml ? `<div class="pswp-meta-tags">${tagsHtml}</div>` : ''}
            </div>
          `;
        }
      });
    }
  });
});
lightbox.init();