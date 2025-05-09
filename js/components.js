document.addEventListener('DOMContentLoaded', function () {
  // Load the header
  fetch('header.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('header-placeholder').innerHTML = data;
    });

  // Load the navigation
  fetch('nav.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('nav-placeholder').innerHTML = data;
      // @ts-ignore
      if (window.cart) {
        // @ts-ignore
        window.cart.updateCartCount();
      }
    });

  // Load the footer
  fetch('footer.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });

  // Load the mobilenav
  fetch('mobile-nav.html')
    .then((response) => response.text())
    // @ts-ignore
    // @ts-ignore
    .then((data) => {
      // Remove live-server injected scripts
      const cleanData = `<div class="mobile-nav">
          <a href="#" class="mobile-nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
            </svg>
            <span>Home</span>
          </a>
          <a href="#" class="mobile-nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
            <span>Search</span>
          </a>
          <a href="#" class="mobile-nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path
                d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"
              />
            </svg>
            <span>Cart</span>
          </a>
          <a href="#" class="mobile-nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path
                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </svg>
            <span>Account</span>
          </a>
        </div>
        `;
      document.getElementById('mobile-nav-placeholder').innerHTML = cleanData;
    });

  // LR Copy
  fetch('left-right-copy.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('lrcopy-placeholder').innerHTML = data;
    });

  //FAQs
  fetch('faqs.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('faqs-placeholder').innerHTML = data;
    });
});
