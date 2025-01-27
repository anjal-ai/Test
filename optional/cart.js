class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        // Load cart from localStorage if it exists
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateTotal();
        }
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            product.quantity = 1;
            this.items.push(product);
        }

        this.updateTotal();
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item added to cart');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.updateTotal();
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;

        // Add notification to body
        document.body.appendChild(notification);

        // Remove notification after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

// Initialize cart globally
window.cart = new Cart();

// Add click event listener to cart icon to show cart contents
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    showCartModal();
});

function showCartModal() {
    // Remove existing modal if present
    const existingModal = document.querySelector('.cart-modal');
    if (existingModal) existingModal.remove();

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'cart-modal';

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'cart-modal-content';

    // Cart Header
    const cartHeader = document.createElement('div');
    cartHeader.className = 'cart-header';
    cartHeader.innerHTML = `
        <h2>Your Cart</h2>
        <button class="close-modal">&times;</button>
    `;

    // Cart Items
    const cartItems = document.createElement('div');
    cartItems.className = 'cart-items';

    if (window.cart.items.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        window.cart.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });
    }

    // Cart Footer
    const cartFooter = document.createElement('div');
    cartFooter.className = 'cart-footer';
    cartFooter.innerHTML = `
        <div class="cart-total">
            <span>Total:</span>
            <span>$${window.cart.total.toFixed(2)}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
    `;

    // Assemble modal
    modalContent.appendChild(cartHeader);
    modalContent.appendChild(cartItems);
    if (window.cart.items.length > 0) {
        modalContent.appendChild(cartFooter);
    }
    modal.appendChild(modalContent);

    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());

    modal.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const item = window.cart.items.find(item => item.id === id);
            if (item) {
                window.cart.updateQuantity(id, item.quantity - 1);
                showCartModal(); // Refresh modal
            }
        });
    });

    modal.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const item = window.cart.items.find(item => item.id === id);
            if (item) {
                window.cart.updateQuantity(id, item.quantity + 1);
                showCartModal(); // Refresh modal
            }
        });
    });

    modal.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            window.cart.removeItem(id);
            showCartModal(); // Refresh modal
        });
    });

    // Checkout button
    const checkoutBtn = modal.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.cart.showNotification('Coming Soon: Checkout functionality');
        });
    }

    // Add modal to body
    document.body.appendChild(modal);
}
