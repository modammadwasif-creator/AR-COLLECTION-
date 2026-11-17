/* =========================================
   AR COLLECTION - PRODUCT DATABASE
========================================= */
 const VIP_PRODUCTS = [

    // 1. SKMEI WATCH
    {
        id: "watch-001",
        name: "SKMEI Original 9232",
        category: "Men Watches",
        price: 3500,
        oldPrice: 3800,

        images: [
            "Screenshot 2026-11-18 011413.png",
            "Screenshot 2026-11-18 011424.png"
        ],

        description: `NEW ARRIVAL

LUXURY WATCH

BINBOND (PP)

DOWN SECOND WORKING

DATE WORKING

STAINLESS STEEL CHAIN

GENTS WEAR

GOOD FINISHING

IN NEW ATTRACTIVE COLOURS

LUXURY LOOK`,

        badge: "New Arrival",
        featured: true,
        inStock: true
    },


    // 2. ROLEX SUBMARINER
    {
        id: "watch-002",
        name: "Rolex Submariner - Basil Rotating",
        category: "Men Watches",
        price: 2300,
        oldPrice: 2800,

        images: [
            "Screenshot 2026-11-18 011435.png",
            "Screenshot 2026-11-18 011453.png",
            "Screenshot 2026-11-18 011503.png",
            "Screenshot 2026-11-18 011513.png"
        ],

        description: `NEW ARRIVAL

LUXURY WATCH

HUBLOT DIAMOND CUT

DATE WORKING

STAINLESS STEEL CHAIN

BUTTERFLY LOCK

GENTS WEAR

GOOD FINISHING

IN NEW ATTRACTIVE COLOURS`,

        badge: "New Arrival",
        featured: false,
        inStock: true
    }

];
/* =========================================
   AR COLLECTION - PRODUCT HELPERS
========================================= */

function getProductById(productId) {

    const searchId = String(productId ?? "").trim();

    return VIP_PRODUCTS.find(
        product => String(product.id) === searchId
    ) || null;

}


function getProductsByCategory(category) {

    const searchCategory = String(category ?? "")
        .trim()
        .toLowerCase();

    return VIP_PRODUCTS.filter(product =>

        String(product.category ?? "")
            .trim()
            .toLowerCase() === searchCategory

    );

}


function getFeaturedProducts() {

    return VIP_PRODUCTS.filter(product =>

        product.featured === true &&
        product.inStock !== false

    );

}


function getAvailableProducts() {

    return VIP_PRODUCTS.filter(product =>

        product.inStock !== false

    );

}


/* =========================================
   IMAGE PATH NORMALIZER
   Product images are stored beside HTML files.
========================================= */

function vipNormalizeImagePath(value) {

    const raw = String(value ?? "").trim();

    if (!raw) return "";

    // Preserve full web URLs and data/blob URLs.
    if (
        /^(https?:)?\/\//i.test(raw) ||
        /^(data:|blob:)/i.test(raw)
    ) {

        return raw;

    }

    // Support Windows separators and old folder paths.
    return raw.replace(/\\/g, "/").split("/").pop();

}


function vipSlug(value) {

    return String(value || "option")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "option";

}


/* =========================================
   NORMALIZE ALL PRODUCT IMAGE PATHS
========================================= */

VIP_PRODUCTS.forEach(function (product) {

    product.images = Array.isArray(product.images)

        ? product.images
            .map(vipNormalizeImagePath)
            .filter(Boolean)

        : [];


    // Normalize variants only when actual variants are supplied.
    if (Array.isArray(product.variants)) {

        product.variants = product.variants.map(function (rawVariant, index) {

            const source = typeof rawVariant === "string"

                ? { name: rawVariant }

                : (rawVariant || {});


            const name = String(

                source.name ||
                source.color ||
                source.label ||
                source.title ||
                ("Option " + (index + 1))

            );


            const variantImages = Array.isArray(source.images)

                ? source.images
                    .map(vipNormalizeImagePath)
                    .filter(Boolean)

                : [];


            const singleImage = vipNormalizeImagePath(

                source.image ||
                source.imageUrl ||
                source.image_url ||
                source.src ||
                ""

            );


            const images = variantImages.length

                ? variantImages

                : (singleImage ? [singleImage] : []);


            const price = Number(

                source.price ??
                source.salePrice ??
                source.amount ??
                product.price ??
                0

            );


            return {

                ...source,

                id: String(
                    source.id ||
                    vipSlug(name) + "-" + (index + 1)
                ),

                name,

                color: String(source.color || name),

                price: Number.isFinite(price)
                    ? price
                    : Number(product.price || 0),

                images,

                image: images[0] || singleImage || ""

            };

        });

    }

});


/* =========================================
   PRODUCT VARIANTS + GALLERY
========================================= */

function getVIPProductVariants(product) {

    if (!product) return [];


    const productImages = Array.isArray(product.images)

        ? product.images
            .map(vipNormalizeImagePath)
            .filter(Boolean)

        : [];


    let rawVariants = [];


    if (Array.isArray(product.variants)) {

        rawVariants = product.variants;

    } else if (
        product.variants &&
        typeof product.variants === "object"
    ) {

        rawVariants = Object.entries(product.variants).map(
            function ([name, value]) {

                return typeof value === "object" && value !== null

                    ? { name, ...value }

                    : { name, price: value };

            }
        );

    }


    // Products with actual named variants.
    if (rawVariants.length) {

        return rawVariants.map(function (rawVariant, index) {

            const variant = typeof rawVariant === "string"

                ? { name: rawVariant }

                : (rawVariant || {});


            const name = String(

                variant.name ||
                variant.color ||
                variant.label ||
                variant.title ||
                ("Option " + (index + 1))

            );


            const explicitImages = Array.isArray(variant.images)

                ? variant.images
                    .map(vipNormalizeImagePath)
                    .filter(Boolean)

                : [];


            const singleImage = vipNormalizeImagePath(

                variant.image ||
                variant.imageUrl ||
                variant.image_url ||
                variant.src ||
                ""

            );


            const choiceImages = explicitImages.length

                ? explicitImages

                : singleImage

                    ? [singleImage]

                    : [...productImages];


            const price = Number(
                variant.price ?? product.price ?? 0
            );


            return {

                id: String(
                    variant.id ||
                    vipSlug(name) + "-" + (index + 1)
                ),

                name,

                color: String(variant.color || name),

                price: Number.isFinite(price)
                    ? price
                    : Number(product.price || 0),

                images: choiceImages,

                image: choiceImages[0] || ""

            };

        });

    }


    // Normal product: one standard option with all gallery images.
    return [{

        id: "standard",

        name: "Standard",

        color: "",

        price: Number(product.price || 0),

        images: productImages,

        image: productImages[0] || ""

    }];

}


function getVIPVariantById(product, variantId) {

    const variants = getVIPProductVariants(product);

    return variants.find(function (variant) {

        return String(variant.id) === String(variantId);

    }) || variants[0] || null;

}


/* =========================================
   CONTINUOUS PICTURE ID SYSTEM
========================================= */

function getAllProductImages() {

    const allImages = [];

    let imageNumber = 0;


    VIP_PRODUCTS.forEach(function (product) {

        const imageList = [

            ...(Array.isArray(product.images) ? product.images : [])

        ];


        // Also include variant-only images.
        if (Array.isArray(product.variants)) {

            product.variants.forEach(function (variant) {

                if (Array.isArray(variant.images)) {

                    imageList.push(...variant.images);

                }

                if (variant.image) {

                    imageList.push(variant.image);

                }

            });

        }


        const uniqueImages = [...new Set(

            imageList
                .map(vipNormalizeImagePath)
                .filter(Boolean)

        )];


        uniqueImages.forEach(function (imageUrl) {

            imageNumber++;


            allImages.push({

                pictureId: "VIP-IMG-0." + imageNumber,

                productId: product.id,

                productName: product.name,

                imageUrl

            });

        });

    });


    return allImages;

}


function getPictureIdForImage(productId, imageUrl) {

    const cleanImage = vipNormalizeImagePath(imageUrl);


    const found = getAllProductImages().find(function (item) {

        return (

            String(item.productId) === String(productId) &&

            item.imageUrl === cleanImage

        );

    });


    return found ? found.pictureId : null;

}


function findProductImageById(pictureId) {

    const searchId = String(pictureId || "")
        .trim()
        .toUpperCase();


    return getAllProductImages().find(function (image) {

        return image.pictureId.toUpperCase() === searchId;

    }) || null;

}


/* =========================================
   AR COLLECTION - PRODUCT DATA CHECK
========================================= */

(function validateVIPProducts() {

    const seenIds = new Set();

    const duplicateIds = [];


    VIP_PRODUCTS.forEach(function (product) {

        const id = String(product.id || "");


        if (seenIds.has(id)) {

            duplicateIds.push(id);

        }


        seenIds.add(id);

    });


    if (duplicateIds.length) {

        console.error(
            "AR COLLECTION duplicate product IDs:",
            duplicateIds
        );

    }


    console.info(

        "AR COLLECTION products loaded:",

        VIP_PRODUCTS.length,

        "| images:",

        getAllProductImages().length

    );

})();