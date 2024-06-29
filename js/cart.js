
const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);
    };

    const calculateTotalPrice = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const removeItemFromCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        useCartItem();
    };

    const updateItemQuantity = (productId, change) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.id === productId);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity < 1) {
                alert('Quantity cannot be less than 1');
            } else {
                item.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                useCartItem();
            }
        }
    };

    const useCartItem = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${item.title} - $${item.price.toFixed(2)}
                <div>
                    <button class="btn btn-secondary btn-sm me-1 decrement-btn">-</button>
                    <span class="badge bg-primary rounded-pill">${item.quantity}</span>
                    <button class="btn btn-secondary btn-sm ms-1 increment-btn">+</button>
                    <button class="btn btn-danger btn-sm ms-2 delete-btn">Delete</button>
                </div>
            `;
            li.querySelector('.decrement-btn').addEventListener('click', () => updateItemQuantity(item.id, -1));
            li.querySelector('.increment-btn').addEventListener('click', () => updateItemQuantity(item.id, 1));
            li.querySelector('.delete-btn').addEventListener('click', () => removeItemFromCart(item.id));
            cartItems.appendChild(li);
        });
        totalPriceElement.textContent = calculateTotalPrice().toFixed(2);
    };

    updateCartCount();
    useCartItem();
