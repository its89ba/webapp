(function() {
      // ---------- STATE ----------
      let cart = JSON.parse(localStorage.getItem('vividCart_pro')) || [];
      let userDetails = JSON.parse(localStorage.getItem('vividUser_pro')) || null;

      // ---------- PRODUCT DATA ----------
      const products = {
        wallDecor: [
          {name:"Macrame Wall Hanging", price:899, img:"IMAGES/WD1.jpg"},
          {name:"Abstract Canvas", price:1499, img:"IMAGES/WD2.jpg"},
          {name:"Jute Wall Art", price:2199, img:"IMAGES/WD3.jpg"},
          {name:"Floating Set", price:1299, img:"IMAGES/WD4.jpg"},
          {name:"Boho Tapestry", price:749, img:"IMAGES/WD5.jpg"},
          {name:"Mirror Decor", price:1899, img:"https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&auto=format"}
        ],
        artificialPlants: [
          {name:"Fiddle lavender Leaf", price:1599, img:"IMAGES/AP.jpg"},
          {name:"Succulent Trio", price:699, img:"IMAGES/AP1.jpg"},
          {name:"Hanging Ivy", price:849, img:"IMAGES/AP2.jpg"},
          {name:"Monstera Plant", price:1899, img:"IMAGES/AP3.jpg"},
          {name:"Orchid Stem", price:1199, img:"IMAGES/AP4.jpg"},
          {name:"Pink Tree", price:1349, img:"IMAGES/APFIVE.jpg"}
        ],
        lamps: [
          {name:"Street Lamp", price:1799, img:"IMAGES/LAMP.jpg"},
          {name:"Table Lamp", price:3299, img:"IMAGES/LAMP1.jpg"},
          {name:"Rattan Lamp", price:2499, img:"IMAGES/LAMP2.jpg"},
          {name:"Wall Sconce Pair", price:1399, img:"IMAGES/LAMP3.jpg"},
          {name:"Arc Floor Lamp", price:899, img:"IMAGES/LAMP4.jpg"},
          {name:"Ceramic Table Lamp", price:2099, img:"IMAGES/LAMP5.jpg"}
        ],
        vases: [
          {name:"Terracotta Set", price:1099, img:"IMAGES/VASE1.jpg"},
          {name:"Ribbed Vase", price:1899, img:"IMAGES/VASE2.jpg"},
          {name:"Handcrafted Ceramic", price:1649, img:"IMAGES/VASE3.jpg"},
          {name:"Minimalist Marble", price:1299, img:"IMAGES/VASE4.jpg"},
          {name:"Bud Vase Duo", price:2399, img:"IMAGES/VASEFIVR.jpg"},
          {name:"Ceramic Vase", price:799, img:"https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&auto=format"}
        ],
        clocks: [
          {name:"LongMountainic Clock", price:2799, img:"IMAGES/CLOCK1.jpg"},
          {name:"Vintage Wall Clock", price:1499, img:"IMAGES/CLCOK2.jpg"},
          {name:"Modern Minimalist", price:1199, img:"IMAGES/CLCOK3.jpg"},
          {name:"Digital Smart Clock", price:2199, img:"IMAGES/CLCOK4.jpg"}
        ]
      };

      // ---------- CORE FUNCTIONS ----------
      function saveCart() { 
        localStorage.setItem('vividCart_pro', JSON.stringify(cart)); 
        updateCartCount(); 
      }
      
      function updateCartCount() { 
        const countEl = document.getElementById('cartCount');
        if (countEl) countEl.innerText = cart.length; 
      }

      function closeSidebar() {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
      }

      function showPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
        if (pageId === 'mainPage') {
          document.getElementById('mainPage').classList.add('active-page');
          document.getElementById('dynamicPage').classList.remove('active-page');
        } else {
          document.getElementById('mainPage').classList.remove('active-page');
          document.getElementById('dynamicPage').classList.add('active-page');
          renderDynamicPage(pageId);
        }
        closeSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      function showToast(msg, bg) {
        let toast = document.createElement('div'); 
        toast.innerText = msg; 
        toast.style.position='fixed'; 
        toast.style.bottom='30px'; 
        toast.style.left='50%'; 
        toast.style.transform='translateX(-50%)'; 
        toast.style.backgroundColor=bg; 
        toast.style.color='white'; 
        toast.style.padding='12px 24px'; 
        toast.style.borderRadius='60px'; 
        toast.style.zIndex='9999'; 
        toast.style.fontWeight='500'; 
        toast.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';
        document.body.appendChild(toast); 
        setTimeout(()=> toast.remove(), 1800);
      }

      function showSuccessModal() {
        document.getElementById('successModal').classList.add('active');
      }

      // ---------- RENDER DYNAMIC PAGES ----------
      function renderDynamicPage(pageId) {
        const container = document.getElementById('dynamicPage');
        if (pageId === 'account') renderAccountPage(container);
        else if (pageId === 'cart') renderCartPage(container);
        else if (pageId === 'allProducts') renderAllProducts(container);
        else if (products[pageId]) renderProductGrid(container, pageId, products[pageId]);
        else showPage('mainPage');
      }

      function renderProductGrid(container, category, items) {
        const displayName = category.replace(/([A-Z])/g,' $1').replace(/^./, str => str.toUpperCase());
        container.innerHTML = `<div style="padding:1rem 2rem 0"><button class="btn back-home"><i class="fas fa-arrow-left"></i> Back Home</button><h2 style="margin:0.5rem 0 0 0.8rem;">${displayName}</h2></div><div class="product-grid" id="proGrid"></div>`;
        const grid = container.querySelector('#proGrid');
        items.forEach(item => {
          const card = document.createElement('div'); card.className = 'product-card';
          card.innerHTML = `<img src="${item.img}" alt="${item.name}"><h4>${item.name}</h4><p class="price">₹${item.price}</p><div class="btn-group"><button class="btn add-to-cart" data-name="${item.name}" data-price="${item.price}">Add</button><button class="btn btn-outline buy-now" data-name="${item.name}" data-price="${item.price}">Buy</button></div>`;
          grid.appendChild(card);
        });
        attachCartEvents(container);
        container.querySelector('.back-home')?.addEventListener('click', ()=> showPage('mainPage'));
      }

      function renderAllProducts(container) {
        let all = [];
        Object.values(products).forEach(cat => all.push(...cat));
        container.innerHTML = `<div><button class="btn back-home" style="margin:1rem 2rem"><i class="fas fa-arrow-left"></i> Home</button><h2 style="margin-left:2rem;">All Designs</h2></div><div class="product-grid" id="allGrid"></div>`;
        const grid = container.querySelector('#allGrid');
        all.forEach(p => {
          const card = document.createElement('div'); card.className = 'product-card';
          card.innerHTML = `<img src="${p.img}" alt="${p.name}"><h4>${p.name}</h4><p class="price">₹${p.price}</p><div class="btn-group"><button class="btn add-to-cart" data-name="${p.name}" data-price="${p.price}">Add</button><button class="btn btn-outline buy-now" data-name="${p.name}" data-price="${p.price}">Buy</button></div>`;
          grid.appendChild(card);
        });
        attachCartEvents(container);
        container.querySelector('.back-home')?.addEventListener('click', ()=> showPage('mainPage'));
      }

      function attachCartEvents(container) {
        container.querySelectorAll('.add-to-cart').forEach(btn => {
          btn.addEventListener('click', () => {
            const name = btn.dataset.name, price = parseInt(btn.dataset.price);
            cart.push({name, price});
            saveCart();
            showToast(`${name} added ✨`, "#C17A5A");
          });
        });
        container.querySelectorAll('.buy-now').forEach(btn => {
          btn.addEventListener('click', () => {
            const name = btn.dataset.name, price = parseInt(btn.dataset.price);
            cart.push({name, price});
            saveCart();
            showPage('cart');
          });
        });
      }

      // ---------- CART PAGE ----------
      function renderCartPage(container) {
        const total = cart.reduce((s, i) => s + i.price, 0);
        const delivery = total >= 2000 ? 0 : 80;
        const finalTotal = total + delivery;
        container.innerHTML = `
          <div class="cart-wrapper">
            <h1><i class="fas fa-shopping-bag"></i> Your Shopping Bag (${cart.length})</h1>
            ${cart.length === 0 ? `<p>Your bag is empty. <button class="btn" id="startShopping">Start Shopping</button></p>` : `
            <div class="cart-layout">
              <div class="cart-items-section">
                ${cart.map((item, idx) => `
                  <div class="cart-item-enhanced">
                    <div><strong>${item.name}</strong></div>
                    <div>₹${item.price}</div>
                    <div class="quantity-selector">
                      <button class="qty-dec" data-idx="${idx}">-</button>
                      <span id="qty-${idx}">1</span>
                      <button class="qty-inc" data-idx="${idx}">+</button>
                    </div>
                    <div id="item-total-${idx}">₹${item.price}</div>
                    <button class="remove-item" data-idx="${idx}"><i class="fas fa-trash"></i></button>
                  </div>
                `).join('')}
              </div>
              <div class="summary-card">
                <h3>Order Summary</h3>
                <p>Subtotal: ₹<span id="summarySubtotal">${total}</span></p>
                <p>Shipping: ${delivery === 0 ? 'FREE' : '₹'+delivery}</p>
                <h4>Total: ₹<span id="summaryTotal">${finalTotal}</span></h4>
                <button class="checkout-btn" id="proceedCheckout">Proceed to Checkout</button>
                <button class="btn" id="continueShopping">Continue Shopping</button>
              </div>
            </div>`}
          </div>`;
        
        if (cart.length === 0) {
          container.querySelector('#startShopping')?.addEventListener('click', ()=> showPage('mainPage'));
          return;
        }
        
        let quantities = cart.map(() => 1);
        
        function updateTotals() {
          let newTotal = cart.reduce((s, item, i) => s + (item.price * quantities[i]), 0);
          let newDelivery = newTotal >= 2000 ? 0 : 80;
          document.getElementById('summarySubtotal').innerText = newTotal;
          document.getElementById('summaryTotal').innerText = newTotal + newDelivery;
        }
        
        container.querySelectorAll('.qty-inc').forEach(b => b.addEventListener('click', (e) => {
          const idx = e.target.dataset.idx; quantities[idx]++; 
          document.getElementById('qty-'+idx).innerText = quantities[idx];
          document.getElementById('item-total-'+idx).innerText = '₹' + (cart[idx].price * quantities[idx]);
          updateTotals();
        }));
        
        container.querySelectorAll('.qty-dec').forEach(b => b.addEventListener('click', (e) => {
          const idx = e.target.dataset.idx; if(quantities[idx]>1) quantities[idx]--;
          document.getElementById('qty-'+idx).innerText = quantities[idx];
          document.getElementById('item-total-'+idx).innerText = '₹' + (cart[idx].price * quantities[idx]);
          updateTotals();
        }));
        
        container.querySelectorAll('.remove-item').forEach(b => b.addEventListener('click', (e) => {
          const idx = e.target.closest('button').dataset.idx; cart.splice(idx,1); quantities.splice(idx,1);
          saveCart(); renderCartPage(container);
        }));
        
        container.querySelector('#proceedCheckout').addEventListener('click', ()=> {
          if (!userDetails?.address) { 
            showToast("Please complete your profile to continue", "#c7362b"); 
            showPage('account'); 
          }
          else renderOrderConfirm(container, cart.reduce((s,item,i)=> s+(item.price*quantities[i]),0));
        });
        
        container.querySelector('#continueShopping').addEventListener('click', ()=> showPage('mainPage'));
      }

      // ---------- ORDER CONFIRM ----------
      function renderOrderConfirm(container, total) {
        const delivery = total >= 2000 ? 0 : 80;
        const orderId = "DEC" + Math.floor(Math.random() * 1000000);
        container.innerHTML = `
          <div class="confirm-order-wrapper">
            <h2>Confirm Order #${orderId}</h2>
            <div class="order-layout">
              <div class="order-card">
                <div class="card-header"><i class="fas fa-map-marker-alt"></i><h3>Delivery Address</h3></div>
                <p>${userDetails.firstName} ${userDetails.lastName}</p>
                <p>${userDetails.address}, ${userDetails.city}, ${userDetails.pincode}</p>
                <p>Phone: ${userDetails.phone}</p>
              </div>
              <div class="order-card">
                <div class="card-header"><i class="fas fa-credit-card"></i><h3>Payment</h3></div>
                <div class="payment-option-card selected"><i class="fas fa-money-bill-wave"></i> Cash on Delivery</div>
                <p style="margin-top:1rem;"><strong>Total: ₹${total + delivery}</strong></p>
                <button class="place-order-btn-enhanced" id="finalOrderBtn">Place Order · ₹${total+delivery}</button>
                <button class="btn" id="backToCartFromConfirm">Back to Cart</button>
              </div>
            </div>
          </div>`;
        container.querySelector('#finalOrderBtn').addEventListener('click', ()=> {
          cart = []; saveCart(); showSuccessModal();
        });
        container.querySelector('#backToCartFromConfirm').addEventListener('click', ()=> renderCartPage(container));
      }

      // ---------- ACCOUNT PAGE ----------
      // REPLACE the entire renderAccountPage function with this enhanced version
// LOCATION: Inside the script, replace lines where renderAccountPage is defined

function renderAccountPage(container) {
  if (userDetails && userDetails.firstName && userDetails.address) {
    // ========== LOGGED IN - ENHANCED DASHBOARD ==========
    const memberSince = new Date().getFullYear();
    const orderCount = JSON.parse(localStorage.getItem('vividOrderCount') || '0');
    
    container.innerHTML = `
      <div class="account-dashboard">
        <!-- Hero Section -->
        <div class="account-hero">
          <div class="account-avatar-large">
            <i class="fas fa-user-circle"></i>
          </div>
          <div class="account-info">
            <h2>Welcome back, ${userDetails.firstName}! 👋</h2>
            <p>Member since ${memberSince} · ${userDetails.email || 'Email not set'}</p>
            <div class="account-stats-row">
              <div class="stat-badge">
                <div class="stat-num">${cart.length}</div>
                <div class="stat-lbl">Cart Items</div>
              </div>
              <div class="stat-badge">
                <div class="stat-num">${orderCount}</div>
                <div class="stat-lbl">Orders</div>
              </div>
              <div class="stat-badge">
                <div class="stat-num">0</div>
                <div class="stat-lbl">Wishlist</div>
              </div>
              <div class="stat-badge">
                <div class="stat-num">₹0</div>
                <div class="stat-lbl">Saved</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions-grid">
          <div class="quick-action-card" onclick="document.getElementById('cartIcon').click()">
            <i class="fas fa-shopping-bag"></i>
            <span>My Cart</span>
          </div>
          <div class="quick-action-card" id="quickOrders">
            <i class="fas fa-box"></i>
            <span>My Orders</span>
          </div>
          <div class="quick-action-card" id="quickWishlist">
            <i class="fas fa-heart"></i>
            <span>Wishlist</span>
          </div>
          <div class="quick-action-card" id="quickSupport">
            <i class="fas fa-headset"></i>
            <span>Support</span>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="account-grid-enhanced">
          <!-- Profile Card -->
          <div class="enhanced-card" id="profileCard">
            <div class="card-header-enhanced">
              <h3><i class="fas fa-id-card"></i> Personal Information</h3>
              <button class="edit-btn-icon" id="editProfileBtnEnhanced" title="Edit Profile">
                <i class="fas fa-pen"></i>
              </button>
            </div>
            <div class="info-grid" id="profileInfoDisplay">
              <div class="info-item">
                <span class="info-label">Full Name</span>
                <span class="info-value">${userDetails.firstName} ${userDetails.lastName}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${userDetails.email || 'Not provided'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Phone</span>
                <span class="info-value">${userDetails.phone || 'Not provided'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Member Since</span>
                <span class="info-value">${memberSince}</span>
              </div>
            </div>
          </div>

          <!-- Address Card -->
          <div class="enhanced-card" id="addressCard">
            <div class="card-header-enhanced">
              <h3><i class="fas fa-map-marker-alt"></i> Delivery Address</h3>
              <button class="edit-btn-icon" id="editAddressBtnEnhanced" title="Edit Address">
                <i class="fas fa-pen"></i>
              </button>
            </div>
            <div class="address-display" id="addressInfoDisplay">
              <div class="address-line">
                <i class="fas fa-building"></i>
                <span>${userDetails.address}</span>
              </div>
              <div class="address-line">
                <i class="fas fa-city"></i>
                <span>${userDetails.city}, ${userDetails.pincode}</span>
              </div>
              <div class="address-line">
                <i class="fas fa-map"></i>
                <span>${userDetails.state || 'Maharashtra'}, India</span>
              </div>
              <div class="address-line">
                <i class="fas fa-phone-alt"></i>
                <span>${userDetails.phone}</span>
              </div>
            </div>
          </div>

          <!-- Preferences Card -->
          <div class="enhanced-card">
            <div class="card-header-enhanced">
              <h3><i class="fas fa-sliders-h"></i> Preferences</h3>
            </div>
            <div class="preference-list">
              <div class="preference-row">
                <span><i class="fas fa-envelope" style="margin-right: 8px; color: #C17A5A;"></i> Email Notifications</span>
                <label class="switch">
                  <input type="checkbox" checked id="prefEmail">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="preference-row">
                <span><i class="fas fa-sms" style="margin-right: 8px; color: #C17A5A;"></i> SMS Alerts</span>
                <label class="switch">
                  <input type="checkbox" id="prefSMS">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="preference-row">
                <span><i class="fas fa-newspaper" style="margin-right: 8px; color: #C17A5A;"></i> Newsletter</span>
                <label class="switch">
                  <input type="checkbox" checked id="prefNewsletter">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="preference-row">
                <span><i class="fas fa-tag" style="margin-right: 8px; color: #C17A5A;"></i> Promo Offers</span>
                <label class="switch">
                  <input type="checkbox" checked id="prefPromo">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="account-actions-row">
          <button class="btn-logout" id="logoutAccEnhanced">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
          <button class="btn-shopping" id="backHomeAccEnhanced">
            <i class="fas fa-shopping-bag"></i> Continue Shopping
          </button>
        </div>
      </div>
    `;

    // ========== EVENT LISTENERS ==========
    
    // Edit Profile
    container.querySelector('#editProfileBtnEnhanced').addEventListener('click', () => {
      const profileInfoDisplay = container.querySelector('#profileInfoDisplay');
      profileInfoDisplay.innerHTML = `
        <div class="edit-input-group">
          <label style="font-size:0.8rem; color:#8a857a;">First Name</label>
          <input type="text" id="editFirstName" value="${userDetails.firstName}" placeholder="First Name">
        </div>
        <div class="edit-input-group">
          <label style="font-size:0.8rem; color:#8a857a;">Last Name</label>
          <input type="text" id="editLastName" value="${userDetails.lastName}" placeholder="Last Name">
        </div>
        <div class="edit-input-group">
          <label style="font-size:0.8rem; color:#8a857a;">Email</label>
          <input type="email" id="editEmail" value="${userDetails.email || ''}" placeholder="Email">
        </div>
        <div class="edit-input-group">
          <label style="font-size:0.8rem; color:#8a857a;">Phone</label>
          <input type="tel" id="editPhone" value="${userDetails.phone}" placeholder="Phone">
        </div>
        <button class="save-btn-inline" id="saveProfileBtn">💾 Save Changes</button>
        <button class="cancel-btn-inline" id="cancelProfileBtn">Cancel</button>
      `;
      
      container.querySelector('#saveProfileBtn').addEventListener('click', () => {
        userDetails.firstName = container.querySelector('#editFirstName').value;
        userDetails.lastName = container.querySelector('#editLastName').value;
        userDetails.email = container.querySelector('#editEmail').value;
        userDetails.phone = container.querySelector('#editPhone').value;
        localStorage.setItem('vividUser_pro', JSON.stringify(userDetails));
        renderAccountPage(container);
        showToast("Profile updated successfully! ✅", "#4A6552");
      });
      
      container.querySelector('#cancelProfileBtn').addEventListener('click', () => {
        renderAccountPage(container);
      });
    });

    // Edit Address
    container.querySelector('#editAddressBtnEnhanced').addEventListener('click', () => {
      const addressInfoDisplay = container.querySelector('#addressInfoDisplay');
      addressInfoDisplay.innerHTML = `
        <div class="edit-input-group">
          <label style="font-size:0.8rem; color:#8a857a;">Street Address</label>
          <input type="text" id="editAddress" value="${userDetails.address}" placeholder="Street Address">
        </div>
        <div class="edit-input-group">
          <label style="font-size:0.8rem; color:#8a857a;">City</label>
          <input type="text" id="editCity" value="${userDetails.city}" placeholder="City">
        </div>
        <div class="edit-input-group">
          <label style="font-size:0.8rem; color:#8a857a;">Pincode</label>
          <input type="text" id="editPincode" value="${userDetails.pincode}" placeholder="Pincode">
        </div>
        <div class="edit-input-group">
          <label style="font-size:0.8rem; color:#8a857a;">State</label>
          <select id="editState">
            <option ${userDetails.state === 'Maharashtra' ? 'selected' : ''}>Maharashtra</option>
            <option ${userDetails.state === 'Delhi' ? 'selected' : ''}>Delhi</option>
            <option ${userDetails.state === 'Karnataka' ? 'selected' : ''}>Karnataka</option>
            <option ${userDetails.state === 'Tamil Nadu' ? 'selected' : ''}>Tamil Nadu</option>
            <option ${userDetails.state === 'West Bengal' ? 'selected' : ''}>West Bengal</option>
            <option ${userDetails.state === 'Gujarat' ? 'selected' : ''}>Gujarat</option>
          </select>
        </div>
        <button class="save-btn-inline" id="saveAddressBtn">💾 Save Address</button>
        <button class="cancel-btn-inline" id="cancelAddressBtn">Cancel</button>
      `;
      
      container.querySelector('#saveAddressBtn').addEventListener('click', () => {
        userDetails.address = container.querySelector('#editAddress').value;
        userDetails.city = container.querySelector('#editCity').value;
        userDetails.pincode = container.querySelector('#editPincode').value;
        userDetails.state = container.querySelector('#editState').value;
        localStorage.setItem('vividUser_pro', JSON.stringify(userDetails));
        renderAccountPage(container);
        showToast("Address updated successfully! ✅", "#4A6552");
      });
      
      container.querySelector('#cancelAddressBtn').addEventListener('click', () => {
        renderAccountPage(container);
      });
    });

    // Preference toggles
    ['prefEmail', 'prefSMS', 'prefNewsletter', 'prefPromo'].forEach(id => {
      const toggle = container.querySelector(`#${id}`);
      if (toggle) {
        toggle.addEventListener('change', (e) => {
          const prefName = id.replace('pref', '');
          const status = e.target.checked ? 'enabled' : 'disabled';
          showToast(`${prefName} notifications ${status}`, "#C17A5A");
        });
      }
    });

    // Quick action cards
    container.querySelector('#quickOrders')?.addEventListener('click', () => {
      showToast("Order history coming soon! 📦", "#C17A5A");
    });
    
    container.querySelector('#quickWishlist')?.addEventListener('click', () => {
      showToast("Wishlist feature coming soon! ❤️", "#C17A5A");
    });
    
    container.querySelector('#quickSupport')?.addEventListener('click', () => {
      showToast("Contact us at hello@decora.com", "#C17A5A");
    });

    // Logout
    container.querySelector('#logoutAccEnhanced').addEventListener('click', () => {
      userDetails = null;
      localStorage.removeItem('vividUser_pro');
      showPage('mainPage');
      showToast("Logged out successfully 👋", "#4A6552");
    });

    // Continue Shopping
    container.querySelector('#backHomeAccEnhanced').addEventListener('click', () => showPage('mainPage'));

  } else {
    // ========== LOGIN/SIGNUP VIEW (kept clean and professional) ==========
    container.innerHTML = `
      <div class="auth-wrapper">
        <div class="auth-container">
          <div class="auth-left">
            <div class="auth-brand">
              <div class="auth-logo" style="font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 1rem;">DECORA</div>
              <p style="font-size: 1.1rem; line-height: 1.6;">Join the DECORA family and discover curated interiors for your dream home.</p>
            </div>
            <div class="auth-benefits" style="margin-top: 2rem;">
              <div class="benefit-item" style="display:flex; align-items:center; gap:1rem; padding:0.8rem 0;">
                <i class="fas fa-truck"></i> Free Shipping on orders ₹2000+
              </div>
              <div class="benefit-item" style="display:flex; align-items:center; gap:1rem; padding:0.8rem 0;">
                <i class="fas fa-undo-alt"></i> Easy 7-Day Returns
              </div>
              <div class="benefit-item" style="display:flex; align-items:center; gap:1rem; padding:0.8rem 0;">
                <i class="fas fa-gift"></i> Exclusive Member Offers
              </div>
              <div class="benefit-item" style="display:flex; align-items:center; gap:1rem; padding:0.8rem 0;">
                <i class="fas fa-heart"></i> Save to Wishlist
              </div>
            </div>
          </div>
          
          <div class="auth-right">
            <div class="auth-tabs-container">
              <button class="auth-tab-btn active" data-tab="signup">Create Account</button>
              <button class="auth-tab-btn" data-tab="login">Sign In</button>
            </div>
            
            <div id="signupContainer" class="auth-form-container active">
              <div class="input-group">
                <i class="fas fa-user"></i>
                <input type="text" id="signupName" placeholder="Full Name" required>
              </div>
              <div class="input-group">
                <i class="fas fa-envelope"></i>
                <input type="email" id="signupEmail" placeholder="Email Address" required>
              </div>
              <div class="input-group">
                <i class="fas fa-phone"></i>
                <input type="tel" id="signupPhone" placeholder="Phone Number" required>
              </div>
              <div class="input-group">
                <i class="fas fa-location-dot"></i>
                <input type="text" id="signupAddress" placeholder="Street Address" required>
              </div>
              <div class="row-2">
                <div class="input-group">
                  <i class="fas fa-city"></i>
                  <input type="text" id="signupCity" placeholder="City" required>
                </div>
                <div class="input-group">
                  <i class="fas fa-code"></i>
                  <input type="text" id="signupPincode" placeholder="Pincode" required>
                </div>
              </div>
              <div class="input-group">
                <i class="fas fa-map"></i>
                <select id="signupState" required>
                  <option value="">Select State</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>West Bengal</option>
                  <option>Gujarat</option>
                </select>
              </div>
              <button type="button" class="auth-submit-btn" id="signupBtn">
                <i class="fas fa-user-plus"></i> Create Account
              </button>
            </div>
            
            <div id="loginContainer" class="auth-form-container">
              <div class="input-group">
                <i class="fas fa-envelope"></i>
                <input type="email" id="loginEmail" placeholder="Email Address" required>
              </div>
              <div class="input-group">
                <i class="fas fa-lock"></i>
                <input type="password" id="loginPassword" placeholder="Password">
              </div>
              <button type="button" class="auth-submit-btn" id="loginBtn">
                <i class="fas fa-sign-in-alt"></i> Sign In
              </button>
            </div>
            
            <button class="btn" id="skipAuth" style="width:100%; margin-top:1rem; background:transparent; border:1px solid #e0dbd0; color:#6c757d;">
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    `;

    // Tab switching
    container.querySelectorAll('.auth-tab-btn').forEach(b => b.addEventListener('click', (e) => {
      container.querySelectorAll('.auth-tab-btn').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      container.querySelectorAll('.auth-form-container').forEach(f => f.classList.remove('active'));
      container.querySelector('#' + e.target.dataset.tab + 'Container').classList.add('active');
    }));

    // Signup handler
    container.querySelector('#signupBtn').addEventListener('click', () => {
      const name = document.getElementById('signupName')?.value.trim();
      const email = document.getElementById('signupEmail')?.value.trim();
      const phone = document.getElementById('signupPhone')?.value.trim();
      const address = document.getElementById('signupAddress')?.value.trim();
      const city = document.getElementById('signupCity')?.value.trim();
      const pincode = document.getElementById('signupPincode')?.value.trim();
      const state = document.getElementById('signupState')?.value;

      if (!name || !email || !phone || !address || !city || !pincode || !state) {
        showToast("Please fill all fields", "#c7362b");
        return;
      }
      userDetails = {
        firstName: name.split(' ')[0] || "User",
        lastName: name.split(' ')[1] || "",
        email, phone, address, city, pincode, state
      };
      localStorage.setItem('vividUser_pro', JSON.stringify(userDetails));
      showToast("Account created successfully! 🎉", "#4A6552");
      showPage('mainPage');
    });

    // Login handler
    container.querySelector('#loginBtn').addEventListener('click', () => {
      const email = document.getElementById('loginEmail')?.value.trim();
      if (!email) {
        showToast("Please enter your email address", "#c7362b");
        return;
      }
      if (userDetails && userDetails.email === email) {
        showToast("Logged in successfully! ✅", "#4A6552");
        showPage('mainPage');
      } else {
        showToast("Email not found. Please sign up first.", "#c7362b");
        container.querySelector('.auth-tab-btn[data-tab="signup"]')?.click();
      }
    });

    container.querySelector('#skipAuth').addEventListener('click', () => showPage('mainPage'));
  }
}

      // ---------- INITIALIZE ALL EVENT LISTENERS ----------
      function init() {
        // Menu toggle
        document.getElementById('menuToggle').addEventListener('click', () => {
          document.getElementById('sidebar').classList.add('active');
          document.getElementById('overlay').classList.add('active');
        });
        
        // Close sidebar
        document.getElementById('closeSidebar').addEventListener('click', closeSidebar);
        document.getElementById('overlay').addEventListener('click', closeSidebar);
        
        // Logo home
        document.getElementById('logoHome').addEventListener('click', () => showPage('mainPage'));
        
        // Header icons
        document.getElementById('loginIcon').addEventListener('click', () => showPage('account'));
        document.getElementById('cartIcon').addEventListener('click', () => showPage('cart'));
        
        // Sidebar navigation
        document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            if (page) showPage(page);
          });
        });
        
        // Footer links
        document.querySelectorAll('.footer-link').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.dataset.page;
            if (page) showPage(page);
          });
        });
        
        // Catalog cards
        document.querySelectorAll('.catalog-card').forEach(card => {
          card.addEventListener('click', () => showPage(card.dataset.page));
        });
        
        // Scroll to catalog
        document.getElementById('scrollToCatalog')?.addEventListener('click', () => {
          document.getElementById('catalogSection').scrollIntoView({behavior:'smooth'});
        });
        
        // View all products
        document.getElementById('viewAllProductsBtn')?.addEventListener('click', () => showPage('allProducts'));
        
        // Explore buttons
        document.querySelectorAll('.explore-btn').forEach(btn => {
          btn.addEventListener('click', () => showPage('allProducts'));
        });
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchWrapper = document.querySelector('.search-dropdown');
        
        if(searchInput && searchWrapper) {
          searchInput.addEventListener('click', (e) => {
            e.stopPropagation();
            searchWrapper.classList.toggle('active');
          });
          
          document.querySelectorAll('.search-option').forEach(option => {
            option.addEventListener('click', (e) => {
              e.stopPropagation();
              const page = option.dataset.page;
              searchInput.value = option.innerText.trim();
              searchWrapper.classList.remove('active');
              if(page) showPage(page);
            });
          });
          
          document.addEventListener('click', (e) => {
            if (!searchWrapper.contains(e.target) && e.target !== searchInput) {
              searchWrapper.classList.remove('active');
            }
          });
        }
        
        // Newsletter
        const newsletterBtn = document.getElementById('newsletterBtn');
        const newsletterInput = document.getElementById('newsletterEmail');
        
        if(newsletterBtn && newsletterInput) {
          newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            if(email) {
              showToast("Thanks! Please complete your profile →", "#C17A5A");
              showPage('account');
              newsletterInput.value = '';
            } else {
              showToast("Please enter your email", "#c7362b");
            }
          });
        }
        
        // Close modal
        document.getElementById('closeModalBtn')?.addEventListener('click', () => {
          document.getElementById('successModal').classList.remove('active');
          showPage('mainPage');
        });
        
        // Hero slider
        let slideIdx = 0;
        const slides = document.querySelectorAll('.slide');
        if(slides.length > 0) {
          setInterval(() => {
            slides[slideIdx].classList.remove('active-slide');
            slideIdx = (slideIdx + 1) % slides.length;
            slides[slideIdx].classList.add('active-slide');
          }, 4200);
        }
        
        // Initial setup
        updateCartCount();
        showPage('mainPage');
      }

      // Run initialization when DOM is fully loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    })();
