const CART_KEY = "cart";

export function getCart() {
    const cart = localStorage.getItem(CART_KEY);

    return cart ? JSON.parse(cart) : [];
}

export function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function removeFromCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {
        existingProduct.quantity -= 1;

        if (existingProduct.quantity <= 0) {
            cart.splice(cart.indexOf(existingProduct), 1);
        }
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}       

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}

export function getCartTotal() {
    const cart = getCart();

    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}