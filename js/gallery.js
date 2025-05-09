// @ts-nocheck
// Initialize all galleries when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Find all gallery containers on the page
  const galleryContainers = document.querySelectorAll('.gallery-container');

  // Create an ImageGallery instance for each container
  galleryContainers.forEach((container) => {
    new ImageGallery(container);
  });
});

class ImageGallery {
  constructor(galleryContainer) {
    // Store the gallery container reference
    this.container = galleryContainer;

    // Find elements within this specific gallery container
    this.imageSlides = this.container.querySelectorAll(
      '.inner-slider-container img'
    );
    this.buttonRight = this.container.querySelector('.button-slider-right');
    this.buttonLeft = this.container.querySelector('.button-slider-left');
    this.checkAutoplay = this.container.querySelector('.autoplay');
    this.thumbs = this.container.querySelectorAll('.thumbnails img');

    // Instance variables
    this.currentIndex = 1;
    this.autoplayInterval = null;
    this.thumbIndex = 0;

    // Initialize the gallery
    this.init();
  }

  init() {
    // Setup circular slider and store counts
    const { realSlideCount, totalSlideCount } = this.setupCircularSlider();
    this.realSlideCount = realSlideCount;
    this.totalSlideCount = totalSlideCount;

    // Set up event listeners
    this.buttonRight.addEventListener('click', () => this.moveSlide('next'));
    this.buttonLeft.addEventListener('click', () => this.moveSlide('prev'));

    // Set up thumbnails click events
    this.setupThumbnails();

    // Initialize autoplay and hover pause
    this.handleAutoplayState();
    this.setupHoverPause();
    this.checkAutoplay.addEventListener('change', () =>
      this.handleAutoplayState()
    );
  }

  updateSlide() {
    this.container.querySelector(
      '.inner-slider-container'
    ).style.transform = `translateX(${-100 * this.currentIndex}%)`;
  }

  setupCircularSlider() {
    const container = this.container.querySelector('.inner-slider-container');
    const slides = this.container.querySelectorAll(
      '.inner-slider-container img'
    );

    // Clone first and last slides
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);

    // Add classes to identify clones
    firstSlideClone.classList.add('clone');
    lastSlideClone.classList.add('clone');

    // Append clones
    container.appendChild(firstSlideClone);
    container.insertBefore(lastSlideClone, slides[0]);

    // Adjust initial position to show first real slide
    container.style.transform = 'translateX(-100%)';

    return {
      realSlideCount: slides.length,
      totalSlideCount: slides.length + 2, // Including clones
    };
  }

  moveSlide(direction = 'next') {
    const container = this.container.querySelector('.inner-slider-container');
    container.style.transition = 'transform 1s ease';

    if (direction === 'next') {
      this.currentIndex++;
    } else if (direction === 'prev') {
      this.currentIndex--;
    }

    container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    this.updateThumbnails();
  }

  updateThumbnails() {
    let realIndex;

    if (this.currentIndex === 0) {
      realIndex = this.realSlideCount - 1; // Last thumbnail for the last clone
    } else if (this.currentIndex === this.totalSlideCount - 1) {
      realIndex = 0; // First thumbnail for the first clone
    } else {
      realIndex = this.currentIndex - 1; // Adjust for real slides (index 1-4 maps to 0-3)
    }

    this.thumbs.forEach((thumb) => thumb.classList.remove('active-border'));
    this.thumbs[realIndex].classList.add('active-border');
  }

  setupThumbnails() {
    this.thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        this.thumbs.forEach((t) => t.classList.remove('active-border'));
        thumb.classList.add('active-border');

        // add 1 because real slides start at index 1
        this.currentIndex = index + 1;

        // Update slider position with transition
        const container = this.container.querySelector(
          '.inner-slider-container'
        );
        container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        container.style.transition = 'ease transform 1s';
      });
    });
  }

  handleAutoplayState() {
    const container = this.container.querySelector('.inner-slider-container');

    // Function to handle transitions
    const handleTransitionEnd = () => {
      // If we're at the last index (first slide clone)
      if (this.currentIndex >= this.totalSlideCount - 1) {
        container.style.transition = 'none';
        this.currentIndex = 1;
        container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        setTimeout(() => {
          container.style.transition = 'ease transform 1s';
          this.updateThumbnails();
        }, 10);
      }
      // If we're at the first index (last slide clone)
      else if (this.currentIndex <= 0) {
        container.style.transition = 'none';
        this.currentIndex = this.realSlideCount;
        container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        setTimeout(() => {
          container.style.transition = 'ease transform 1s';
          this.updateThumbnails();
        }, 10);
      }
    };

    // Remove any existing event listener (to prevent duplicates)
    container.removeEventListener('transitionend', this._handleTransitionEnd);
    // Store reference to the bound function so we can remove it later
    this._handleTransitionEnd = handleTransitionEnd;
    // Add event listener for transition end
    container.addEventListener('transitionend', this._handleTransitionEnd);

    // Clear any existing interval
    clearInterval(this.autoplayInterval);

    if (this.checkAutoplay.checked) {
      this.autoplayInterval = setInterval(() => {
        this.moveSlide('next');
      }, 3000);
    }
  }

  setupHoverPause() {
    const container = this.container.querySelector('.inner-slider-container');

    container.addEventListener('mouseenter', () => {
      // Pause the autoplay when mouse hovers over the slider
      clearInterval(this.autoplayInterval);
    });

    container.addEventListener('mouseleave', () => {
      // Resume autoplay when mouse leaves (only if autoplay is checked)
      if (this.checkAutoplay.checked) {
        clearInterval(this.autoplayInterval); // Clear any existing interval first
        this.autoplayInterval = setInterval(() => {
          const container = this.container.querySelector(
            '.inner-slider-container'
          );
          container.style.transition = 'ease transform 1s';
          this.currentIndex++;
          container.style.transform = `translateX(-${
            this.currentIndex * 100
          }%)`;
          this.updateThumbnails();
        }, 3000);
      }
    });
  }
}
