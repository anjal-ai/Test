const products = [
    {
        dataid: "1",
        image: "./assets/datejust.webp",
        name: "Datejust",
        brand: "Rolex",
        description: "Elegant and timeless watch.",
        price: 7500
    },
    {
        dataid: "2",
        image: "./assets/submariner.webp",
        name: "Submariner",
        brand: "Rolex",
        description: "A classic dive watch.",
        price: 8500
    },
    {
        dataid: "3",
        image: "./assets/daydate.webp",
        name: "DayDate",
        brand: "Rolex",
        description: "A sporty yet elegant design.",
        price: 12000
    },
    {
        dataid: "4",
        image: "./assets/daytona.webp",
        name: "Daytona",
        brand: "Rolex",
        description: "A legendary chronograph.",
        price: 5500
    },
    {
        dataid: "5",
        image: "./assets/nautilus.webp",
        name: "Nautilus",
        brand: "Patek Philippe",
        description: "Elegant and timeless watch.",
        price: 20000
    },
    {
        dataid: "6",
        image: "./assets/royaloak.webp",
        name: "Royal Oak",
        brand: "Audemars Piguet",
        description: "A classic dive watch.",
        price: 8500
    },
    {
        dataid: "7",
        image: "./assets/gmtmaster.webp",
        name: "GMT-Master II",
        brand: "Rolex",
        description: "A sporty yet elegant design.",
        price: 12000
    },
    {
        dataid: "8",
        image: "./assets/seedmaster.webp",
        name: "Speedmaster",
        brand: "Omega",
        description: "Omega Speedmaster Professional Moonwatch.",
        price: 3500
    },
    {
        dataid: "9",
        image: "./assets/37658472-0kw40a39f0dovdfgc2wnei7z-ExtraLarge.jpg",
        name: "Calatrava",
        brand: "Patek Philippe",
        description: "Pilot Travel Time.",
        price: 27901
    },
    {
        dataid: "10",
        image: "./assets/37577035-wxi5hklch8w3i9tfpdzm0vra-ExtraLarge.jpg",
        name: "Pilot Chronograph",
        brand: "IWC",
        description: "Pilot's Watch Royal Maces Chronograph Ceramic Black 44.5mm IW389107 Full Set.",
        price: 3500
    },
    {
        dataid: "11",
        image: "./assets/Untitled.jpg",
        name: "Black Bay",
        brand: "Tudor",
        description: "Heritage Black Bay Blue 41mm Auto Steel 79230B Bracelet.",
        price: 2649
    },
    {
        dataid: "12",
        image: "./assets/36417491-b3d4kxb0crtfdbildbwiqkep-ExtraLarge.jpg",
        name: "Submariner Date",
        brand: "Rolex",
        description: "40mm Steel 18K Yellow Gold Steel Black Dial Mens Watch 16803",
        price: 9150
    }
];


const renderProducts = (productList) => {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Clear existing content

    productList.forEach(product => {
        const productCard = `
        <div class="product-card" data-id="${product.dataid}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <p class="brand">${product.brand}</p>
                <p>${product.description}</p>
                <p class="price">$${product.price.toLocaleString()}</p>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        </div>
        `;
        container.innerHTML += productCard;
    });

    // Add click event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.dataset.id;
            const selectedProduct = products.find(p => p.dataid === productId);

            if (selectedProduct && window.cart) {
                window.cart.addItem({
                    id: selectedProduct.dataid,
                    title: selectedProduct.name,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                    quantity: 1
                });
            }
        });
    });
};

// Filter by Brand
const filterByBrand = () => {
    const selectedBrand = document.getElementById("filter-brand").value;

    let filteredProducts = products;
    if (selectedBrand !== "all") {
        filteredProducts = products.filter(product => product.brand === selectedBrand);
    }

    renderProducts(filteredProducts);
};


// Sort by Price
const sortByPrice = () => {
    const sortOption = document.getElementById("sort-price").value;

    let sortedProducts = [...products];
    if (sortOption === "low-to-high") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(sortedProducts);
};

// Render products on page load
renderProducts(products);
