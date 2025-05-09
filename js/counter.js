document.addEventListener('DOMContentLoaded', function () {
  const counter = document.querySelector('.counter-number');

  // Create the observer
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start animation for this counter
          animateCounter(entry.target);
          // Stop observing after animation starts
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  observer.observe(counter);

  function animateCounter(counterElement) {
    const targetNumber = parseInt(counterElement.getAttribute('data-target'));
    console.log('Animating counter to:', targetNumber);
    const duration = 2500; // 2 seconds

    // Clear existing content and prepare container
    counterElement.innerHTML = '';
    counterElement.style.display = 'flex';

    // Convert target to string to get digits
    const targetStr = targetNumber.toString();

    // Create digit elements
    for (let i = 0; i < targetStr.length; i++) {
      console.log('Loop number', i);
      const digitEl = document.createElement('div');
      digitEl.className = 'digit-column';

      // Create the rolling digit strip
      const strip = document.createElement('div');
      strip.className = 'digit-strip';

      // Add all possible digits (0-9) multiple times to create rolling effect
      // Repeat digits to simulate multiple rotations

      // First set (starting position)
      for (let n = 0; n <= 9; n++) {
        const digitValue = document.createElement('div');
        digitValue.className = 'digit-value';
        digitValue.textContent = n.toString();
        strip.appendChild(digitValue);
      }

      // Second set (one full rotation)
      for (let n = 0; n <= 9; n++) {
        const digitValue = document.createElement('div');
        digitValue.className = 'digit-value';
        digitValue.textContent = n.toString();
        strip.appendChild(digitValue);
      }

      // Third set - ending with our target digit
      for (let n = 0; n <= 9; n++) {
        const digitValue = document.createElement('div');
        digitValue.className = 'digit-value';
        digitValue.textContent = n.toString();
        strip.appendChild(digitValue);
      }

      digitEl.appendChild(strip);
      counterElement.appendChild(digitEl);

      // Calculate final position for this digit
      const finalDigit = parseInt(targetStr[i]);
      console.log(finalDigit);

      // Ensure initial position is explicitly set to show "0"
      strip.style.transform = 'translateY(0)';

      // Force browser to compute layout before animation
      void digitEl.offsetWidth;

      // Set transition after initial render to ensure animation works
      setTimeout(() => {
        strip.style.transition = `transform ${duration}ms ease-out`;
        // Move to final digit in third set (20 + finalDigit)
        strip.style.transform = `translateY(-${(20 + finalDigit) * 100}px)`;
      }, 50 + (targetStr.length - i - 1) * 150); // Staggered delay
    }
  }
});
