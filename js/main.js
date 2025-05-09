document.addEventListener('DOMContentLoaded', function () {
  const productGrid = document.querySelector('.product-grid');
  const imageOverlay = document.getElementById('image-overlay');
  const fullSizeImage = document.getElementById('full-size-image');
  const closeButton = document.getElementById('close-overlay');

  // Use delegation - listen to clicks on product grid
  productGrid.addEventListener('click', function (e) {
    // Check if the clicked element is a quick view button
    // @ts-ignore
    if (e.target.classList.contains('quick-view-button')) {
      e.preventDefault();
      e.stopPropagation();

      // @ts-ignore
      const fullSizeImageURL = e.target.dataset.fullimage;
      // @ts-ignore
      fullSizeImage.src = fullSizeImageURL;
      imageOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  closeButton.addEventListener('click', closeOverlay);

  function closeOverlay() {
    imageOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  imageOverlay.addEventListener('click', function (e) {
    if (e.target === imageOverlay) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && imageOverlay.classList.contains('active')) {
      closeOverlay();
    }
  });
});
