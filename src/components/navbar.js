export function Navbar() {
    const nav = document.createElement("header");

    const path = window.location.pathname;

    function linkClass(route) {
        return `
            transition-colors
            hover:text-blue-600
            ${path === route ? "text-blue-600 font-bold" : "text-gray-700"}
        `;
    }

    nav.innerHTML = `
        <div class="
            items-center
            h-20
            flex
            justify-between
            border-b
            border-gray-200
        ">

            <a
                href="/"
                data-link
                class="pl-10 text-lg font-semibold"
            >
                EatBetter
            </a>

            <nav class="flex gap-10">

                <a
                    href="/shop"
                    class="${linkClass("/")}"
                    data-link
                >
                    Pratos
                </a>
                
                <a
                    href="/cart"
                    class="${linkClass("/cart")}"
                    data-link
                >
                    Carrinho
                </a>

            </nav>

        </div>
    `;

    return nav;
}