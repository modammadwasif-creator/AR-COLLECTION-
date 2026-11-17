/* =========================================
   AR COLLECTION - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MOBILE MENU
    // =====================================

    const menuToggle = document.querySelector("#menuToggle");

    const navMenu =
        document.querySelector("#mainNav") ||
        document.querySelector("#navMenu");

    if (menuToggle && navMenu) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                navMenu.classList.contains("active") ? "true" : "false"
            );

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }


    // =====================================
    // 2. PRICE FORMAT
    // =====================================

    function formatPrice(price) {

        const amount = Number(price || 0);

        return amount > 0
            ? "Rs. " + amount.toLocaleString("en-PK")
            : "Price coming soon";

    }


    function escapeHTML(value) {

        return String(value ?? "").replace(/[&<>"']/g, c => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        })[c]);

    }


    // =====================================
    // 3. FEATURED PRODUCTS
    // =====================================

    const featuredContainer =
        document.querySelector("#featuredProducts");


    if (featuredContainer) {

        if (
            typeof VIP_PRODUCTS === "undefined" ||
            !Array.isArray(VIP_PRODUCTS)
        ) {

            featuredContainer.innerHTML =
                "<p>Products could not be loaded.</p>";

        } else {

            const products =

                typeof getFeaturedProducts === "function"

                    ? getFeaturedProducts().slice(0, 4)

                    : VIP_PRODUCTS.filter(

                        product =>
                            product.featured &&
                            product.inStock !== false

                    ).slice(0, 4);


            if (!products.length) {

                featuredContainer.innerHTML =
                    "<p>No featured watches available right now.</p>";

            } else {

                featuredContainer.innerHTML = products.map(function (product) {

                    const image =

                        typeof vipNormalizeImagePath === "function"

                            ? vipNormalizeImagePath(
                                product.images?.[0] || ""
                            )

                            : (product.images?.[0] || "");


                    const oldPrice =

                        Number(product.oldPrice) > Number(product.price) &&
                        Number(product.price) > 0

                            ? `

                                <span class="old-price">

                                    ${formatPrice(product.oldPrice)}

                                </span>

                            `

                            : "";


                    return `

                        <article class="product-card">


                            <a

                                href="product.html?id=${encodeURIComponent(product.id)}"

                                class="product-image-wrap"

                            >

                                ${

                                    product.badge

                                        ? `

                                            <span class="product-badge">

                                                ${escapeHTML(product.badge)}

                                            </span>

                                        `

                                        : ""

                                }


                                <img

                                    src="${escapeHTML(image)}"

                                    alt="${escapeHTML(product.name)}"

                                    loading="lazy"

                                    onerror="this.style.display='none'"

                                >

                            </a>


                            <div class="product-info">


                                <span class="product-category">

                                    ${escapeHTML(product.category || "")}

                                </span>


                                <h3>

                                    <a

                                        href="product.html?id=${encodeURIComponent(product.id)}"

                                    >

                                        ${escapeHTML(product.name)}

                                    </a>

                                </h3>


                                <div class="product-price">


                                    <span class="current-price">

                                        ${formatPrice(product.price)}

                                    </span>


                                    ${oldPrice}


                                </div>


                                <div class="product-card-actions">


                                    <a

                                        href="product.html?id=${encodeURIComponent(product.id)}"

                                        class="btn btn-primary"

                                    >

                                        View Product

                                    </a>


                                </div>


                            </div>


                        </article>

                    `;

                }).join("");

            }

        }

    }


    // =====================================
    // 4. CART COUNT
    // =====================================

    function updateCartCount() {

        const countElement =
            document.querySelector("#cartCount");

        if (!countElement) return;


        try {

            const cart = JSON.parse(

                localStorage.getItem("vip_traders_cart") || "[]"

            );


            const total = Array.isArray(cart)

                ? cart.reduce(

                    (sum, item) =>

                        sum + Math.max(
                            1,
                            Number(item.quantity) || 1
                        ),

                    0

                )

                : 0;


            countElement.textContent = total;


        } catch (error) {

            countElement.textContent = "0";

        }

    }


    updateCartCount();


    window.addEventListener("storage", updateCartCount);


    // =====================================
    // 5. BACK TO TOP
    // =====================================

    const backToTop =
        document.querySelector("#backToTop");


    if (backToTop) {

        window.addEventListener("scroll", function () {

            backToTop.classList.toggle(

                "show",

                window.scrollY > 300

            );

        });


        backToTop.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    // =====================================
    // 6. CURRENT YEAR
    // =====================================

    const yearElement =
        document.querySelector("#currentYear");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    // =====================================
    // 7. CATEGORY LINKS
    // =====================================

    document.querySelectorAll("[data-category]").forEach(link => {

        link.addEventListener("click", function () {

            const category = this.dataset.category;


            if (category) {

                window.location.href =

                    "shop.html?category=" +
                    encodeURIComponent(category);

            }

        });

    });


    // =====================================
    // 8. AR COLLECTION BRAND
    // =====================================

    document.querySelectorAll("[data-brand-name]").forEach(element => {

        element.textContent = "AR COLLECTION";

    });


});