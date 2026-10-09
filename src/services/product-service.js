const CUSTOM_PRODUCTS_KEY = "custom-products";

export async function getProducts() {
    const response = await fetch("/src/data/products.json");

    if (!response.ok) {
        throw new Error("Não foi possível carregar os produtos.");
    }

    const products = await response.json();
    const customProducts = getCustomProducts();

    return [...products, ...customProducts];
}

function getCustomProducts() {
    const products = localStorage.getItem(CUSTOM_PRODUCTS_KEY);

    return products ? JSON.parse(products) : [];
}

export function addProduct(product) {
    const customProducts = getCustomProducts();

    customProducts.push(product);
    localStorage.setItem(
        CUSTOM_PRODUCTS_KEY,
        JSON.stringify(customProducts)
    );
}