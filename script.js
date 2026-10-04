/**
 * PACELINE RUNNING CO. - MASTER JAVASCRIPT
 * Complete interactive logic for Navigation, Filters (Men, Women, Watches, Apparel, Shoes),
 * Shopping Cart Drawer, Wishlist, Search Modal, and Booking.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 2. MASTER PRODUCT FILTERING (MEN, WOMEN, WATCHES, FOOTWEAR, APPAREL, SALE)
  // =========================================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card');
  const catalogSectionHeading = document.getElementById('catalogSectionHeading');
  const catalogSectionTag = document.getElementById('catalogSectionTag');
  const filterActiveStatus = document.getElementById('filterActiveStatus');
  const filterStatusName = document.getElementById('filterStatusName');
  const resetFilterBtn = document.getElementById('resetFilterBtn');

  const filterTitles = {
    all: { tag: '02 · JUST LANDED', title: 'New arrivals for the run.', label: 'All Products' },
    men: { tag: '02 · MEN’S COLLECTION', title: 'Men’s Race-Day & Training Gear', label: 'Men’s Running' },
    women: { tag: '02 · WOMEN’S COLLECTION', title: 'Women’s High-Performance Kit', label: 'Women’s Running' },
    watches: { tag: '02 · PERFORMANCE TECH', title: 'GPS Smartwatches & Running Tech', label: 'Watches & Gear' },
    footwear: { tag: '02 · FOOTWEAR', title: 'Engineered Running Shoes', label: 'Footwear' },
    apparel: { tag: '02 · TECHNICAL APPAREL', title: 'Breathable Layers & Race Tops', label: 'Apparel' },
    bestsellers: { tag: '02 · COMMUNITY FAVOURITES', title: 'Most Popular Across Glasgow', label: 'Best Sellers' },
    raceday: { tag: '02 · RACE DAY READY', title: 'Carbon Plates & Race Singlets', label: 'Race Day' },
    trail: { tag: '02 · TRAIL & ADVENTURE', title: 'Grip & Mountain Protection', label: 'Trail Running' },
    sale: { tag: '02 · END OF SEASON', title: 'Special Offers & Clearance', label: 'Sale' }
  };

  function applyFilter(filterKey, scrollToSection = false) {
    if (!filterKey) filterKey = 'all';

    // Update filter pills UI
    filterPills.forEach(p => {
      if (p.getAttribute('data-filter') === filterKey) {
        p.classList.add('active');
        p.setAttribute('aria-selected', 'true');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      }
    });

    // Update section headers
    const meta = filterTitles[filterKey] || filterTitles['all'];
    if (catalogSectionTag) catalogSectionTag.innerText = meta.tag;
    if (catalogSectionHeading) catalogSectionHeading.innerText = meta.title;

    // Filter indicator badge
    if (filterActiveStatus && filterStatusName) {
      if (filterKey === 'all') {
        filterActiveStatus.style.display = 'none';
      } else {
        filterActiveStatus.style.display = 'block';
        filterStatusName.innerText = meta.label;
      }
    }

    // Filter product cards
    let visibleCount = 0;
    productCards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const cat = (card.getAttribute('data-category') || '').toLowerCase();

      let match = false;
      if (filterKey === 'all') {
        match = true;
      } else if (filterKey === 'watches' || filterKey === 'accessories') {
        match = tags.includes('watches') || tags.includes('accessories') || cat === 'accessories';
      } else if (filterKey === 'footwear') {
        match = tags.includes('footwear') || cat === 'footwear';
      } else if (filterKey === 'apparel') {
        match = tags.includes('apparel') || cat === 'apparel';
      } else {
        match = tags.includes(filterKey);
      }

      if (match) {
        visibleCount++;
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
      } else {
        card.style.display = 'none';
      }
    });

    // Smooth scroll if requested
    if (scrollToSection) {
      const targetSection = document.getElementById('new-arrivals');
      if (targetSection) {
        const offset = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  }

  // Click handler on filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filterValue = pill.getAttribute('data-filter');
      applyFilter(filterValue, false);
    });
  });

  // Reset filter button
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => applyFilter('all', false));
  }

  // View All Collections button
  const viewAllCollectionsBtn = document.getElementById('viewAllCollectionsBtn');
  if (viewAllCollectionsBtn) {
    viewAllCollectionsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter('all', true);
      showToast('Showing All Collections');
    });
  }

  // Hero Shop New Arrivals button
  const heroShopBtn = document.querySelector('.hero-cta-group a[href*="new-arrivals"]');
  if (heroShopBtn) {
    heroShopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter('all', true);
    });
  }

  // =========================================================================
  // 3. CATEGORY CARDS CLICK INTERACTIONS (ROAD, TRAIL, APPAREL, WATCHES)
  // =========================================================================
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = card.getAttribute('data-category');
      if (cat === 'accessories') {
        applyFilter('watches', true);
        showToast('Filtered: Smartwatches & GPS Gear');
      } else if (cat === 'apparel') {
        applyFilter('apparel', true);
        showToast('Filtered: Technical Apparel');
      } else if (cat === 'trail') {
        applyFilter('trail', true);
        showToast('Filtered: Trail Running Gear');
      } else if (cat === 'road') {
        applyFilter('footwear', true);
        showToast('Filtered: Road Running Footwear');
      }
    });
  });

  // =========================================================================
  // 4. EXPLORE SECTION & NAVBAR LINKS (MEN'S & WOMEN'S TRIGGER)
  // =========================================================================
  // Men's explore card link
  const mensExploreLinks = document.querySelectorAll('#men a, a[href="#men"], a[href="#shop-mens"], .mobile-nav-link[href*="men"]');
  mensExploreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.location.pathname.includes('about.html')) return; // let it navigate if on about page
      e.preventDefault();
      applyFilter('men', true);
      showToast('Showing Men’s Running Collection');
    });
  });

  // Women's explore card link
  const womensExploreLinks = document.querySelectorAll('#women a, a[href="#women"], a[href="#shop-womens"], .mobile-nav-link[href*="women"]');
  womensExploreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.location.pathname.includes('about.html')) return;
      e.preventDefault();
      applyFilter('women', true);
      showToast('Showing Women’s Running Collection');
    });
  });

  // Footwear nav links
  const footwearNavLinks = document.querySelectorAll('a[href="#footwear"], .mobile-nav-link[href*="footwear"]');
  footwearNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.location.pathname.includes('about.html')) return;
      e.preventDefault();
      applyFilter('footwear', true);
      showToast('Showing Footwear Collection');
    });
  });

  // Apparel nav links
  const apparelNavLinks = document.querySelectorAll('a[href="#apparel"], .mobile-nav-link[href*="apparel"]');
  apparelNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.location.pathname.includes('about.html')) return;
      e.preventDefault();
      applyFilter('apparel', true);
      showToast('Showing Technical Apparel');
    });
  });

  // Accessories / Watch nav links
  const accessoriesNavLinks = document.querySelectorAll('a[href="#accessories"], .mobile-nav-link[href*="accessories"]');
  accessoriesNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.location.pathname.includes('about.html')) return;
      e.preventDefault();
      applyFilter('watches', true);
      showToast('Showing Smartwatches & Accessories');
    });
  });

  // Sale nav links
  const saleNavLinks = document.querySelectorAll('a[href="#sale"], .mobile-nav-link[href*="sale"]');
  saleNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.location.pathname.includes('about.html')) return;
      e.preventDefault();
      applyFilter('sale', true);
      showToast('Showing Sale & Clearance Deals');
    });
  });

  // Check URL hash on page load (e.g. index.html#men or index.html#women)
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['men', 'women', 'footwear', 'apparel', 'watches', 'sale', 'trail'].includes(hash)) {
      setTimeout(() => applyFilter(hash, true), 200);
    }
  }

  // =========================================================================
  // 5. WISHLIST TOGGLE
  // =========================================================================
  const wishlistButtons = document.querySelectorAll('.product-wishlist-btn');

  wishlistButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isSaved = btn.classList.toggle('saved');
      const card = btn.closest('.product-card');
      const productName = card ? card.querySelector('.product-name').innerText : 'Item';

      if (isSaved) {
        showToast(`Added "${productName}" to your wishlist.`);
      } else {
        showToast(`Removed "${productName}" from your wishlist.`);
      }
    });
  });

  // =========================================================================
  // 6. SHOPPING CART SYSTEM & SLIDE-IN DRAWER
  // =========================================================================
  let cart = [];
  const cartBtn = document.getElementById('cartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBadge = document.getElementById('cartBadge');
  const cartItemCount = document.getElementById('cartItemCount');
  const emptyCart = document.getElementById('emptyCart');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const quickAddBtns = document.querySelectorAll('.quick-add-btn');
  const shopNowCartBtn = document.getElementById('shopNowCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function openCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('active');
      cartDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('active');
      cartDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (shopNowCartBtn) shopNowCartBtn.addEventListener('click', closeCart);

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartBadge) cartBadge.innerText = totalCount;
    if (cartItemCount) cartItemCount.innerText = totalCount;
    if (cartSubtotal) cartSubtotal.innerText = `£${subtotal.toFixed(2)}`;

    if (cart.length === 0) {
      if (emptyCart) emptyCart.style.display = 'block';
      if (cartItemsList) cartItemsList.innerHTML = '';
    } else {
      if (emptyCart) emptyCart.style.display = 'none';
      if (cartItemsList) {
        cartItemsList.innerHTML = cart.map((item, index) => `
          <div class="cart-item-row">
            <img src="${item.img || 'assets/Home/arrivals_section/image.png'}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.name}</h4>
              <p class="cart-item-price">£${item.price} &times; ${item.quantity}</p>
              <button class="cart-item-remove" data-index="${index}">Remove</button>
            </div>
          </div>
        `).join('');

        // Attach remove events
        cartItemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            const removedItem = cart[idx];
            cart.splice(idx, 1);
            updateCartUI();
            showToast(`Removed "${removedItem.name}" from cart.`);
          });
        });
      }
    }
  }

  quickAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      const card = btn.closest('.product-card');
      const img = card ? card.querySelector('.product-img').getAttribute('src') : '';

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, img, quantity: 1 });
      }

      updateCartUI();
      openCart();
      showToast(`Added "${name}" to your cart!`);
    });
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty.');
        return;
      }
      showToast('Proceeding to checkout...');
      setTimeout(() => {
        alert('Thank you for shopping at PACELINE Glasgow!\nOrder Subtotal: ' + cartSubtotal.innerText);
      }, 300);
    });
  }

  // =========================================================================
  // 7. SEARCH MODAL WITH LIVE SEARCH
  // =========================================================================
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchModalBackdrop = document.getElementById('searchModalBackdrop');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const productsDatabase = [
    { name: 'ON Cloudmonster 3 — Hyper Lily', category: 'Road Running / Men & Women', price: '£210', filter: 'footwear' },
    { name: 'Nike Vaporfly 4 — Volt Ice', category: 'Race Day / Men', price: '£240', filter: 'men' },
    { name: 'Hoka Tecton X 4 — Frost / Tangerine', category: 'Trail Running / Women', price: '£220', filter: 'women' },
    { name: 'Asics Megablast — White / Orange Glow', category: 'Road / Sale', price: '£210', filter: 'sale' },
    { name: 'Garmin Forerunner 965 GPS Watch', category: 'Watches & Performance Tech', price: '£520', filter: 'watches' },
    { name: 'COROS PACE 3 GPS Multisport Watch', category: 'Watches & Performance Tech', price: '£219', filter: 'watches' },
    { name: 'Paceline Men’s Aero Pro Singlet', category: 'Men’s Apparel', price: '£68', filter: 'men' },
    { name: 'Women’s Tempo High-Rise Tight', category: 'Women’s Apparel', price: '£85', filter: 'women' },
    { name: 'Glasgow Free Gait Analysis Clinic', category: 'Clinic / Booking', price: 'Free', filter: 'clinic' }
  ];

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('active');
      searchModal.setAttribute('aria-hidden', 'false');
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('active');
      searchModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
  if (searchModalBackdrop) searchModalBackdrop.addEventListener('click', closeSearch);

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = '<p class="search-hint">Popular: Men, Women, Watches, Garmin, Vaporfly, Tecton X, Gait Analysis</p>';
        return;
      }

      const matches = productsDatabase.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = `<p class="search-hint">No products found for "${q}". Try searching "watch", "men", "women", or "shoes".</p>`;
      } else {
        searchResults.innerHTML = `
          <ul style="display: flex; flex-direction: column; gap: 10px;">
            ${matches.map(item => `
              <li style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; cursor: pointer;" class="search-item-row" data-filter="${item.filter}">
                <div>
                  <div style="font-weight: 700; color: #111; font-size: 0.95rem;">${item.name}</div>
                  <span style="display: block; font-size: 0.78rem; color: #888;">${item.category}</span>
                </div>
                <span style="font-weight: 800; font-size: 0.9rem; color: #e25822;">${item.price}</span>
              </li>
            `).join('')}
          </ul>
        `;

        searchResults.querySelectorAll('.search-item-row').forEach(row => {
          row.addEventListener('click', () => {
            const f = row.getAttribute('data-filter');
            closeSearch();
            if (f === 'clinic') {
              window.location.href = 'about.html#visit-us';
            } else {
              applyFilter(f, true);
            }
          });
        });
      }
    });
  }

  // =========================================================================
  // 8. GAIT CLINIC BOOKING MODAL (ABOUT PAGE)
  // =========================================================================
  const bookClinicBtn = document.getElementById('bookClinicBtn');
  const gaitAnalysisModalTrigger = document.getElementById('gaitAnalysisModalTrigger');
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingBtn = document.getElementById('closeBookingBtn');
  const bookingModalBackdrop = document.getElementById('bookingModalBackdrop');
  const bookingForm = document.getElementById('bookingForm');

  function openBookingModal() {
    if (bookingModal) {
      bookingModal.classList.add('active');
      bookingModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeBookingModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      bookingModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (bookClinicBtn) bookClinicBtn.addEventListener('click', openBookingModal);
  if (gaitAnalysisModalTrigger) gaitAnalysisModalTrigger.addEventListener('click', openBookingModal);
  if (closeBookingBtn) closeBookingBtn.addEventListener('click', closeBookingModal);
  if (bookingModalBackdrop) bookingModalBackdrop.addEventListener('click', closeBookingModal);

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName').value;
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;

      if (!name || !date || !time) {
        alert('Please fill in all booking fields.');
        return;
      }

      closeBookingModal();
      showToast(`Appointment confirmed for ${name} on ${date} at ${time}!`);
      bookingForm.reset();
    });
  }

  // =========================================================================
  // 9. NEWSLETTER SUBSCRIPTION
  // =========================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterFeedback = document.getElementById('newsletterFeedback');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (email && email.includes('@')) {
        newsletterEmail.value = '';
        if (newsletterFeedback) {
          newsletterFeedback.style.color = '#d6f83b';
          newsletterFeedback.innerText = 'Welcome to the club! Check your inbox for 10% off.';
        }
        showToast('Subscribed successfully! 10% discount code sent.');
      } else {
        if (newsletterFeedback) {
          newsletterFeedback.style.color = '#ff6b6b';
          newsletterFeedback.innerText = 'Please enter a valid email address.';
        }
      }
    });
  }

  // =========================================================================
  // 10. GLOBAL TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d6f83b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeSearch();
      closeBookingModal();
    }
  });

});
