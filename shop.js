/* =========================================
   AR COLLECTION - SHOP
   Search, Category, Sorting + Admin Picture ID Filter
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const productGrid = document.querySelector("#shopProducts");
    const searchInput = document.querySelector("#shopSearch");
    const categoryFilter = document.querySelector("#categoryFilter");
    const sortFilter = document.querySelector("#sortFilter");
    const resultCount = document.querySelector("#resultCount");

    if (!productGrid) return;


    // Static-site passwords are visible in source code.
    const ADMIN_FILTER_PASSWORD = "HY";


    /* =====================================
       HELPER FUNCTIONS
    ===================================== */

    function escapeHTML(value) {

        return String(value ?? "").replace(/[&<>"']/g, char => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        })[char]);

    }


    function formatPrice(price) {

        const amount = Number(price || 0);

        return amount > 0

            ? "Rs. " + amount.toLocaleString("en-PK")

            : "Price coming soon";

    }


    function cleanImage(image) {

        return typeof vipNormalizeImagePath === "function"

            ? vipNormalizeImagePath(image)

            : String(image || "");

    }


    /* =====================================
       PRODUCT CARD
    ===================================== */

    function createProductCard(product) {

        const image = cleanImage(product.images?.[0] || "");


        const oldPrice =

            Number(product.oldPrice) > Number(product.price) &&
            Number(product.price) > 0

                ? `<span class="old-price">
                        ${formatPrice(product.oldPrice)}
                   </span>`

                : "";


        return `

            <article class="product-card">

                <a
                    href="product.html?id=${encodeURIComponent(product.id)}"
                    class="product-image-wrap"
                >

                    ${
                        product.badge

                            ? `<span class="product-badge">
                                    ${escapeHTML(product.badge)}
                               </span>`

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

                        <a href="product.html?id=${encodeURIComponent(product.id)}">

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

    }


    /* =====================================
       DISPLAY PRODUCTS
    ===================================== */

    let filteredProducts = [];


    function displayProducts(products) {

        productGrid.innerHTML = products.length

            ? products.map(createProductCard).join("")

            : `

                <div class="shop-empty">

                    <h3>No Watches Found</h3>

                    <p>
                        Try another search or category.
                    </p>

                </div>

            `;


        if (resultCount) {

            resultCount.textContent = String(products.length);

        }

    }


    /* =====================================
       PRODUCT SORTING
    ===================================== */

    function applySorting() {

        const sort = sortFilter?.value || "default";

        const sorted = [...filteredProducts];


        if (sort === "low-high") {

            sorted.sort(

                (a, b) => Number(a.price || 0) - Number(b.price || 0)

            );

        }

        else if (sort === "high-low") {

            sorted.sort(

                (a, b) => Number(b.price || 0) - Number(a.price || 0)

            );

        }

        else if (sort === "name") {

            sorted.sort(

                (a, b) => String(a.name).localeCompare(String(b.name))

            );

        }


        displayProducts(sorted);

    }


    /* =====================================
       SEARCH + CATEGORY FILTER
    ===================================== */

    function applyFilters() {

        const search = String(searchInput?.value || "")

            .trim()

            .toLowerCase();


        const category = String(categoryFilter?.value || "all")

            .trim()

            .toLowerCase();


        const source =

            typeof VIP_PRODUCTS !== "undefined" &&
            Array.isArray(VIP_PRODUCTS)

                ? VIP_PRODUCTS

                : [];


        filteredProducts = source.filter(function (product) {


            const searchable = [

                product.name,

                product.category,

                product.description

            ]

                .map(value => String(value || "").toLowerCase())

                .join(" ");


            const matchesSearch = searchable.includes(search);


            const matchesCategory =

                category === "all" ||

                String(product.category || "")

                    .trim()

                    .toLowerCase() === category;


            return (

                product.inStock !== false &&

                matchesSearch &&

                matchesCategory

            );

        });


        applySorting();

    }


    /* =====================================
       FILTER EVENTS
    ===================================== */

    searchInput?.addEventListener("input", applyFilters);

    categoryFilter?.addEventListener("change", applyFilters);

    sortFilter?.addEventListener("change", applySorting);


    /* =====================================
       URL CATEGORY FILTER
    ===================================== */

    const params = new URLSearchParams(window.location.search);

    const categoryFromURL = params.get("category");


    if (categoryFromURL && categoryFilter) {

        const match = Array.from(categoryFilter.options).find(

            option =>

                option.value.toLowerCase() ===

                categoryFromURL.trim().toLowerCase()

        );


        if (match) {

            categoryFilter.value = match.value;

        }

    }


    /* =====================================
       ADMIN PICTURE ID FILTER
    ===================================== */

    const adminButton = document.querySelector(
        "#adminImageFilterButton"
    );


    const adminPanel = document.querySelector(
        "#adminImageFilterPanel"
    );


    const pictureInput = document.querySelector(
        "#pictureIdInput"
    );


    const pictureFindButton = document.querySelector(
        "#pictureIdFindButton"
    );


    const adminResult = document.querySelector(
        "#adminImageResult"
    );


    /* =====================================
       ADMIN PANEL OPEN / CLOSE
    ===================================== */

    if (adminButton && adminPanel) {

        adminPanel.hidden = true;


        adminButton.addEventListener("click", function () {


            // Close panel if already open.
            if (!adminPanel.hidden) {

                adminPanel.hidden = true;

                return;

            }


            const enteredPassword = window.prompt(
                "Enter Admin Password:"
            );


            if (enteredPassword === null) return;


            if (enteredPassword !== ADMIN_FILTER_PASSWORD) {

                alert("Incorrect Admin Password!");

                return;

            }


            adminPanel.hidden = false;

            pictureInput?.focus();

        });

    }


    /* =====================================
       FIND PRODUCT IMAGE BY PICTURE ID
    ===================================== */

    function findPicture() {

        const pictureId = String(pictureInput?.value || "").trim();


        if (!pictureId) {

            alert("Please enter a Picture ID.");

            return;

        }


        if (typeof findProductImageById !== "function") {

            alert("Picture ID system is not loaded!");

            return;

        }


        const found = findProductImageById(pictureId);


        if (!found) {

            if (adminResult) {

                adminResult.innerHTML = `

                    <p class="admin-no-result">

                        Picture ID Not Found!

                    </p>

                `;

            }

            return;

        }


        const product =

            typeof getProductById === "function"

                ? getProductById(found.productId)

                : VIP_PRODUCTS.find(

                    item => String(item.id) === String(found.productId)

                );


        if (!adminResult) return;


        adminResult.innerHTML = `

            <div class="admin-picture-result">


                <img

                    src="${escapeHTML(found.imageUrl)}"

                    alt="${escapeHTML(found.productName)}"

                >


                <div>

                    <h3>

                        ${escapeHTML(found.productName)}

                    </h3>


                    <p>

                        Picture ID:

                        <strong>

                            ${escapeHTML(found.pictureId)}

                        </strong>

                    </p>


                    <p>

                        Image file:

                        ${escapeHTML(found.imageUrl)}

                    </p>


                    ${

                        product

                            ? `

                                <a

                                    class="btn btn-primary"

                                    href="product.html?id=${encodeURIComponent(product.id)}"

                                >

                                    Open Product

                                </a>

                            `

                            : ""

                    }

                </div>


            </div>

        `;

    }


    /* =====================================
       ADMIN BUTTON EVENTS
    ===================================== */

    pictureFindButton?.addEventListener(

        "click",

        findPicture

    );


    pictureInput?.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            findPicture();

        }

    });


    /* =====================================
       INITIAL PRODUCT LOAD
    ===================================== */

    applyFilters();


    console.info(

        "AR COLLECTION SHOP LOADED:",

        filteredProducts.length,

        "watches"

    );

});