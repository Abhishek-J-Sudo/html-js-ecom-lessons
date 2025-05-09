// @ts-nocheck
// cart.js
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.init();
  }

  init() {
    this.renderCartItems();
    this.updateCartCount();
    this.attachEventListeners();
  }

  // Add item to cart
  addItem(productId, title, price, imageUrl) {
    const existingItem = this.items.find(
      (item) => item.id === Number(productId)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: productId,
        title,
        price,
        imageUrl,
        quantity: 1,
      });
    }

    this.saveCart();
    this.renderCartItems();
    this.updateCartCount();
    this.showCartSidebar();
  }

  // Remove item from cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== Number(productId));
    this.saveCart();
    this.renderCartItems();
    this.updateCartCount();
  }

  // Update quantity
  updateQuantity(productId, delta) {
    const item = this.items.find((item) => item.id === Number(productId));
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
        this.renderCartItems();
        this.updateCartCount();
      }
    }
  }

  // Save to localStorage
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  // Calculate total
  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Render cart items
  renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');

    if (this.items.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart">Your cart is empty</p>';
      if (cartTotal) cartTotal.textContent = '₹ 0';
      return;
    }

    cartItemsContainer.innerHTML = this.items
      .map(
        (item) => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.imageUrl}" alt="${item.title}" class="cart-item-image" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-price">₹ ${item.price}</p>
            <div class="quantity-controls">
              <button class="qty-decrease" data-id="${item.id}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="qty-increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="remove-item" data-id="${item.id}">×</button>
        </div>
      `
      )
      .join('');

    if (cartTotal) cartTotal.textContent = `₹ ${this.getTotal()}`;
  }

  // Update cart count in navigation
  updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    cartCountElements.forEach((cartCount) => {
      if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
      }
    });
    const event = new CustomEvent('cartUpdated', {
      detail: { count: totalItems },
    });
    window.dispatchEvent(event);
  }

  // Show cart sidebar
  showCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
      cartSidebar.classList.add('active');
    }
  }

  // Hide cart sidebar
  hideCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
      cartSidebar.classList.remove('active');
    }
  }

  // Attach event listeners
  attachEventListeners() {
    // Cart sidebar toggle
    document.addEventListener('click', (e) => {
      // @ts-ignore
      if (e.target.closest('.cart-toggle')) {
        this.showCartSidebar();
      }

      if (
        // @ts-ignore
        e.target.closest('.cart-overlay') ||
        // @ts-ignore
        e.target.closest('.close-cart')
      ) {
        this.hideCartSidebar();
      }

      // Quantity controls
      // @ts-ignore
      if (e.target.matches('.qty-increase')) {
        // @ts-ignore
        const productId = e.target.dataset.id;
        this.updateQuantity(productId, 1);
      }

      // @ts-ignore
      if (e.target.matches('.qty-decrease')) {
        // @ts-ignore
        const productId = e.target.dataset.id;
        console.log(productId);
        this.updateQuantity(productId, -1);
      }

      // Remove item
      // @ts-ignore
      if (e.target.matches('.remove-item')) {
        // @ts-ignore
        const productId = e.target.dataset.id;
        this.removeItem(productId);
      }
    });
  }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  window.cart = new ShoppingCart();
});
