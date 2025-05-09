// @ts-nocheck
function setupLazyLoading() {
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;

          // Load the image
          img.src = src;
          img.onload = () => {
            img.classList.add('loaded');
          };

          // Stop observing this image
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px', // Load images 50px before they enter viewport
    }
  );

  // Observe all product images
  document.querySelectorAll('.product-image').forEach((img) => {
    imageObserver.observe(img);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const backTop = document.querySelector('.back-to-top');
  const optionsList = {
    optionsFirst: ['Popular', 'Price', 'DateAdded'],
    optionsSecond: [
      ['Most', 'Least'],
      ['High', 'Low'],
      ['New', 'Old'],
    ],
  };
  const firstChoice = document.getElementById('options-first');
  const secondChoice = document.getElementById('options-second');
  let selectedChoice = firstChoice.selectedIndex;
  const downloadList = document.querySelectorAll('.product-downloads');
  const products = [
    {
      id: 1,
      title: 'Product 1',
      price: 1500,
      categories: ['Landscape'],
      imageUrl:
        'https://images.unsplash.com/photo-1745559022871-fa8abca90b28?q=80&w=1294&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dateAdded: new Date('2025-01-15'),
      downloads: 3000,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 2500,
      categories: ['Street'],
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1745520911129-dcccdedb5faa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dateAdded: new Date('2025-02-15'),
      downloads: 4000,
    },
    {
      id: 3,
      title: 'Product 3',
      price: 1000,
      categories: ['Street'],
      imageUrl:
        'https://images.unsplash.com/photo-1745572601167-720dc57db0d8?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dateAdded: new Date('2025-03-15'),
      downloads: 2000,
    },
    {
      id: 4,
      title: 'Product 4',
      price: 1500,
      categories: ['Wedding'],
      imageUrl:
        'https://images.unsplash.com/photo-1736450964290-7fc24f0c02bf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dateAdded: new Date('2025-04-15'),
      downloads: 1000,
    },
    {
      id: 5,
      title: 'Product 5',
      price: 1200,
      categories: ['Portraits'],
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1673388695233-1e66ff1f17dc?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dateAdded: new Date('2025-04-10'),
      downloads: 500,
    },
    {
      id: 6,
      title: 'Product 6',
      price: 3000,
      categories: ['Wedding'],
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1711301937400-9d64e26287ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dateAdded: new Date('2025-04-15'),
      downloads: 4000,
    },
    {
      id: 7,
      title: 'Product 7',
      price: 2000,
      categories: ['Landscape'],
      imageUrl:
        'https://images.unsplash.com/photo-1745276242272-18e54ab3c4b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dateAdded: new Date('2025-04-20'),
      downloads: 7000,
    },
    {
      id: 8,
      title: 'Product 8',
      price: 2500,
      categories: ['Street'],
      imageUrl:
        'https://images.unsplash.com/photo-1744124371777-e7b5984deb77?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dateAdded: new Date('2025-04-25'),
      downloads: 5500,
    },
  ];
  const categoryCheckboxes = document.querySelectorAll(
    '.filter-categories input[type="checkbox"]'
  );
  const clearFilterBtn = document.querySelector('.filter-buttons button');
  let currentSort = {
    firstIndex: 0,
    secondIndex: 0,
  };

  // Products rendering
  function renderProducts(productsToRender = products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    productGrid.innerHTML = productsToRender
      .map(
        (product) => `
      <article class="product-card" data-categories="${product.categories.join(
        ','
      )}">
        <div class="product-image-container">
          <img data-src="${product.imageUrl}" alt="${
          product.title
        }" class="product-image" />
        </div>
        <button
          class="quick-view-button"
          data-fullimage="${product.imageUrl}"
        >
          Quick View
        </button>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <h3 class="product-price">Rs. ${product.price}</h3>
        </div>
         <div class="product-downloads" data-downloads="${product.downloads}">
                Downloads: <span class="download-count">${
                  product.downloads
                }</span>
              </div>
        <button class="add-to-cart-btn" data-product-id="${
          product.id
        }">Add to Cart</button>
      </article>
    `
      )
      .join('');
    setupLazyLoading();
  }
  renderProducts();

  //download list display
  downloadList.forEach((span, index) => {
    const countDisplay = document.querySelectorAll('.download-count');
    const downloads = span.dataset.downloads;
    console.log(downloads);
    countDisplay[index].textContent = downloads;
  });

  // Dropdown logic
  for (let i = 0; i < optionsList.optionsFirst.length; i++) {
    const opt = document.createElement('option');
    opt.innerHTML = optionsList.optionsFirst[i];
    firstChoice.appendChild(opt);
  }

  selectedChoice = 0;
  for (let i = 0; i < optionsList.optionsSecond[0].length; i++) {
    const opt2 = document.createElement('option');
    opt2.innerHTML = optionsList.optionsSecond[0][i];
    secondChoice.appendChild(opt2);
  }

  function populateSecondDropdown(index) {
    secondChoice.innerHTML = '';
    for (let i = 0; i < optionsList.optionsSecond[index].length; i++) {
      const opt2 = document.createElement('option');
      opt2.innerHTML = optionsList.optionsSecond[index][i];
      secondChoice.appendChild(opt2);
    }
    sortFilter(index, 0);
  }

  firstChoice.addEventListener('change', () => {
    selectedChoice = firstChoice.selectedIndex;
    console.log(selectedChoice);
    populateSecondDropdown(selectedChoice);
  });

  populateSecondDropdown(0);

  // Scroll listener
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollPercent = ((scrollTop + windowHeight) / docHeight) * 100;
    if (scrollPercent >= 90) {
      backTop.style.display = 'flex';
      backTop.classList.add('show');
    }
  });

  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  //Filter logic
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      // Find all checked categories
      let checkedCategories = [];

      categoryCheckboxes.forEach((cb) => {
        if (cb.checked) {
          checkedCategories.push(cb.name);
        }
      });

      console.log('Selected categories:', checkedCategories);

      // Filter products based on checked categories
      if (checkedCategories.length > 0) {
        let filteredProducts = products.filter((product) => {
          return product.categories.some((category) =>
            checkedCategories.includes(category)
          );
        });

        // Apply current sort to filtered products
        sortFilteredProducts(
          filteredProducts,
          currentSort.firstIndex,
          currentSort.secondIndex
        );
      } else {
        // If no filters selected, show all products with current sort
        sortFilteredProducts(
          products,
          currentSort.firstIndex,
          currentSort.secondIndex
        );
      }
    });
  });

  clearFilterBtn.addEventListener('click', () => {
    // Uncheck all checkboxes
    categoryCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Show all products
    sortFilteredProducts(
      products,
      currentSort.firstIndex,
      currentSort.secondIndex
    );
  });

  //sort logic
  function sortFilteredProducts(productsArray, firstSort, secondSort) {
    // Create sorted arrays from the provided productsArray instead of global products
    let downloadsMost = productsArray
      .slice()
      .sort((a, b) => b.downloads - a.downloads);
    let downloadsLeast = productsArray
      .slice()
      .sort((a, b) => a.downloads - b.downloads);
    let priceHigh = productsArray.slice().sort((a, b) => b.price - a.price);
    let priceLow = productsArray.slice().sort((a, b) => a.price - b.price);
    let dateNew = productsArray
      .slice()
      .sort((a, b) => b.dateAdded - a.dateAdded);
    let dateOld = productsArray
      .slice()
      .sort((a, b) => a.dateAdded - b.dateAdded);

    // Update current sort state
    currentSort.firstIndex = firstSort;
    currentSort.secondIndex = secondSort;

    // Same rendering logic as before
    if (firstSort === 0 && secondSort === 0)
      return renderProducts(downloadsMost);
    else if (firstSort === 0 && secondSort === 1)
      return renderProducts(downloadsLeast);
    else if (firstSort === 1 && secondSort === 0)
      return renderProducts(priceHigh);
    else if (firstSort === 1 && secondSort === 1)
      return renderProducts(priceLow);
    else if (firstSort === 2 && secondSort === 0)
      return renderProducts(dateNew);
    else if (firstSort === 2 && secondSort === 1)
      return renderProducts(dateOld);
  }

  secondChoice.addEventListener('change', () => {
    const firstIndex = firstChoice.selectedIndex;
    const secondIndex = secondChoice.selectedIndex;
    sortFilter(firstIndex, secondIndex);
  });

  function sortFilter(firstSort, secondSort) {
    // Get currently filtered products based on checked categories
    let currentProducts = products;

    let checkedCategories = [];
    categoryCheckboxes.forEach((cb) => {
      if (cb.checked) {
        checkedCategories.push(cb.name);
      }
    });

    if (checkedCategories.length > 0) {
      currentProducts = products.filter((product) => {
        return product.categories.some((category) =>
          checkedCategories.includes(category)
        );
      });
    }

    // Use the sortFilteredProducts function with the current products
    sortFilteredProducts(currentProducts, firstSort, secondSort);
  }

  //add to cart
  document.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart-btn')) {
      const button = e.target;
      const productId = Number(button.dataset.productId); // Convert to number
      const productCard = button.closest('.product-card');

      const title = productCard.querySelector('.product-title').textContent;
      const price = parseFloat(
        productCard
          .querySelector('.product-price')
          .textContent.replace('Rs. ', '')
      );
      const imageUrl = productCard.querySelector('.product-image').src;

      // Add to cart
      window.cart.addItem(productId, title, price, imageUrl);

      // Optional: show feedback
      button.textContent = 'Added!';
      button.style.background = '#28a745';
      setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.background = '';
      }, 1500);
    }
  });
});
