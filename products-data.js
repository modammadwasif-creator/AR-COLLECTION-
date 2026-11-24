const VIP_PRODUCTS = [

    // 1. COSMO WATCH
    {
        id: "watch-008",
        name: "COSMO",
        category: "Men Watches",
        price: 2000,
        oldPrice: 2600,

        description: `NEW ARRIVAL

NEW MODEL

DATE & DAY WORKING

LUXURY LOOK

NEW ATTRACTIVE COLOURS

PRICE ONLY Rs. 2,000 WITH NORMAL BOX`,

        images: [
            "Screenshot 2026-11-24 235701.png",
            "Screenshot 2026-11-24 235713.png",
            "Screenshot 2026-11-24 235722.png",
            "Screenshot 2026-11-24 235645.png"
        ],

        badge: "New Arrival",
        featured: true,
        inStock: true
    },

    // 2. ROLEX LADIES DATE & DAY
    {
        id: "watch-005",
        name: "ROLEX Ladies Date & Day",
        category: "Ladies Watches",
        price: 2700,
        oldPrice: 2900,

        description: `NEW ARRIVAL

LUXURY WATCH

ROLEX LADIES

DATE & DAY WORKING

STAINLESS STEEL CHAIN

LADIES WEAR

GOOD FINISHING

IN NEW ATTRACTIVE COLOURS

LUXURY LOOK`,

        images: [
            "Screenshot 2026-11-19 174128.png",
            "Screenshot 2026-11-19 174143.png",
            "Screenshot 2026-11-19 174157.png",
            "Screenshot 2026-11-19 174212.png",
            "Screenshot 2026-11-19 174226.png",
            "Screenshot 2026-11-19 174235.png",
            "Screenshot 2026-11-19 174245.png",
            "Screenshot 2026-11-19 174345.png"
        ],

        badge: "New Arrival",
        featured: true,
        inStock: true
    },

    // 3. TOSHI LUXURY GENTS WATCH
    {
        id: "watch-006",
        name: "TOSHI Luxury Gents Watch",
        category: "Men Watches",
        price: 1700,
        oldPrice: 2100,

        description: `NEW ARRIVAL

TOSHI

LUXURY WATCH

DATE WORKING

STAINLESS STEEL CHAIN

GENTS WEAR

GOOD FINISHING

IN NEW ATTRACTIVE COLOURS

LUXURY LOOK`,

        images: [
            "Screenshot 2026-11-19 174902.png",
            "Screenshot 2026-11-19 174913.png",
            "Screenshot 2026-11-19 174924.png"
        ],

        badge: "New Arrival",
        featured: true,
        inStock: true
    },

    // 4. SKMEI WATCH
    {
        id: "watch-001",
        name: "SKMEI Original 9232",
        category: "Men Watches",
        price: 3500,
        oldPrice: 3900,

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

    // 5. ROLEX SUBMARINER
    {
        id: "watch-002",
        name: "Rolex Submariner - Basil Rotating",
        category: "Men Watches",
        price: 2300,
        oldPrice: 2700,

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
        featured: true,
        inStock: true
    },

    // 6. CHENXI COLLECTION
    {
        id: "watch-003",
        name: "CHENXI Collection - Men's Watch",
        category: "Men Watches",
        price: 4000,
        oldPrice: 4600,

        images: [
            "Screenshot 2026-11-18 171734.png",
            "Screenshot 2026-11-18 171755.png",
            "Screenshot 2026-11-18 171814.png",
            "Screenshot 2026-11-18 171830.png",
            "Screenshot 2026-11-18 171903.png"
        ],

        description: `AR COLLECTION

INTRODUCING CHENXI COLLECTION

MEN'S COLLECTION

Time to Elevate Your Style

• Water Resistant
• China Assembled
• Chronograph Edition
• Round Shape - Famous Tag Heuer Model
• Time, Day/Date, Alarm & Stopwatch Display
• All Inner Dials Working
• Stainless Steel Band
• Available in 2 Dial Colours

PRICE: Rs. 4,000
INCLUDES NORMAL BOX`,

        badge: "New Arrival",
        featured: true,
        inStock: true
    },

    // 7. MINBER LUXURY WATCH
    {
        id: "watch-007",
        name: "MINBER Luxury Gents Watch",
        category: "Men Watches",
        price: 3000,
        oldPrice: 3600,

        description: `LUXURY WATCH

MINBER

DATE WORKING

SILICON STRAP

GENTS WEAR

GOOD FINISHING

IN NEW ATTRACTIVE COLOURS

RS 3000 ONLY`,

        images: [
            "Screenshot 2026-11-19 195222.png",
            "Screenshot 2026-11-19 195232.png",
            "Screenshot 2026-11-19 195152.png",
            "Screenshot 2026-11-19 195210.png"
        ],

        badge: "New Arrival",
        featured: true,
        inStock: true
    },

    // 8. SEMI AUTO ROLEX SUBMARINER
    {
        id: "watch-004",
        name: "Semi Auto Rolex Submariner - Basil Rotating",
        category: "Men Watches",
        price: 3000,
        oldPrice: 3500,

        images: [
            "Screenshot 2026-11-19 161321.png",
            "Screenshot 2026-11-19 161416.png",
            "Screenshot 2026-11-19 161434.png"
        ],

        description: `NEW ARRIVAL

SEMI AUTO ROLEX

LUXURY WATCH

ROLEX SUBMARINER

BASIL ROTATING

DATE WORKING

STAINLESS STEEL CHAIN

GENTS WEAR

GOOD FINISHING

IN NEW ATTRACTIVE COLOURS

LUXURY LOOK`,

        badge: "New Arrival",
        featured: true,
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
========================================= */

function vipNormalizeImagePath(value) {

    const raw = String(value ?? "").trim();

    if (!raw) return "";

    if (
        /^(https?:)?\/\//i.test(raw) ||
        /^(data:|blob:)/i.test(raw)
    ) {

        return raw;

    }

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
