// @ts-nocheck
document.addEventListener('DOMContentLoaded', function () {
  // get all containers
  const testiContainers = document.querySelectorAll('.testimonial-container');

  // create instances for each
  testiContainers.forEach((container) => {
    new Testimonial(container);
  });
});

class Testimonial {
  constructor(testiContainer) {
    // store container
    this.container = testiContainer;
    this.slideContainer = this.container.querySelector(
      '.carousel-slide-container'
    );
    this.slides = this.container.querySelectorAll('.carousel-slide');
    this.dotNavContainer = this.container.querySelector(
      '.dot-navigation-container'
    );
    this.dots = this.container.querySelectorAll('.dots');

    // State management
    this.currentIndex = 0;
    this.slideCount = this.slides.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000; // 5 seconds

    // Initialize the carousel
    this.init();
  }

  init() {
    // Create dots if they don't match the number of slides
    this.setupDots();

    // Initialize slide positions
    this.positionSlides();

    // Set up event listeners
    this.setupEventListeners();

    // Start autoplay
    this.startAutoplay();
  }

  setupDots() {
    // Clear existing dots
    this.dotNavContainer.innerHTML = '';

    // Create the right number of dots
    for (let i = 0; i < this.slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dots');
      dot.innerHTML = '&bull;';
      dot.dataset.index = i;

      // Mark the active dot
      if (i === this.currentIndex) {
        dot.classList.add('active');
      }

      this.dotNavContainer.appendChild(dot);
    }

    // Update the dots reference
    this.dots = this.container.querySelectorAll('.dots');
  }

  positionSlides() {
    // Reset all slides
    this.slides.forEach((slide, index) => {
      // Remove all position classes
      slide.classList.remove(
        'active',
        'left',
        'right',
        'far-left',
        'far-right'
      );

      // Calculate relative position to current slide
      const position = this.calculatePosition(index);

      // Add appropriate class based on position
      if (position === 0) {
        slide.classList.add('active');
      } else if (position === -1) {
        slide.classList.add('left');
      } else if (position === 1) {
        slide.classList.add('right');
      } else if (position <= -2) {
        slide.classList.add('far-left');
      } else if (position >= 2) {
        slide.classList.add('far-right');
      }
    });

    // Update active dot
    this.updateActiveDot();
  }

  calculatePosition(index) {
    // Calculate the relative position from current index
    let position = index - this.currentIndex;

    // Handle wrapping for smooth circular navigation
    if (Math.abs(position) > Math.floor(this.slideCount / 2)) {
      if (position > 0) {
        position = position - this.slideCount;
      } else {
        position = this.slideCount + position;
      }
    }

    return position;
  }

  updateActiveDot() {
    // Remove active class from all dots
    this.dots.forEach((dot) => dot.classList.remove('active'));

    // Add active class to current dot
    if (this.dots[this.currentIndex]) {
      this.dots[this.currentIndex].classList.add('active');
    }
  }

  goToSlide(index) {
    // Ensure index is within bounds
    if (index < 0) {
      index = this.slideCount - 1;
    } else if (index >= this.slideCount) {
      index = 0;
    }

    // Update current index
    this.currentIndex = index;

    // Update positions
    this.positionSlides();
  }

  goToNext() {
    this.goToSlide(this.currentIndex + 1);
  }

  goToPrev() {
    this.goToSlide(this.currentIndex - 1);
  }

  setupEventListeners() {
    // Add click event to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoplay();
      });
    });

    // Add swipe/drag events for mobile
    this.setupSwipeEvents();

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.goToPrev();
        this.resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        this.goToNext();
        this.resetAutoplay();
      }
    });

    // Add click events to slides for navigation
    this.slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        const position = this.calculatePosition(index);
        if (position < 0) {
          this.goToPrev();
        } else if (position > 0) {
          this.goToNext();
        }
        this.resetAutoplay();
      });
    });
  }

  setupSwipeEvents() {
    let startX,
      moveX,
      threshold = 100;

    this.slideContainer.addEventListener(
      'touchstart',
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.slideContainer.addEventListener(
      'touchmove',
      (e) => {
        moveX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.slideContainer.addEventListener(
      'touchend',
      () => {
        if (startX === undefined || moveX === undefined) return;

        const diff = startX - moveX;

        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            // Swipe left, go next
            this.goToNext();
          } else {
            // Swipe right, go prev
            this.goToPrev();
          }
          this.resetAutoplay();
        }

        // Reset values
        startX = undefined;
        moveX = undefined;
      },
      { passive: true }
    );
  }

  startAutoplay() {
    // Clear any existing interval
    this.stopAutoplay();

    // Set new interval
    this.autoplayInterval = setInterval(() => {
      this.goToNext();
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
