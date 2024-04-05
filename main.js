
const productsContainer = document.querySelector('#products-section');

let allProducts = [];


const getProduct = (product) => {
    const productContainer = document.createElement('div');
    productContainer.classList.add('products-section__item', 'product-item');
    
    const productImgContainer = document.createElement('div');
    productImgContainer.classList.add('product-item__img-container');

    product.images.forEach(image => {
        const productImg = document.createElement('img');
        productImg.classList.add('product-item__img');
        productImg.src = image;

        productImgContainer.append(productImg);
    });

    const productInfoWrapper = document.createElement('div');
    productInfoWrapper.classList.add('product-item__info-wrapper');

    const productTitle = document.createElement('h4');
    productTitle.classList.add('product-item__title');
    productTitle.innerHTML = product.title;

    const productDesc = document.createElement('div');
    productDesc.classList.add('product-item__description');
    productDesc.innerHTML = product.description;

    const productCategoryWrapper = document.createElement('div');
    productCategoryWrapper.classList.add('product-item__category-wrapper');
    const productCategory = document.createElement('div');
    productCategory.classList.add('product-item__category');
    productCategory.innerHTML = product.category.name;
    productCategoryWrapper.append(productCategory);

    const productLikeBtn = document.createElement('button');
    productLikeBtn.classList.add('product-item__like-button');
    productLikeBtn.innerHTML = 'Like';

    const productPriceWrapper = document.createElement('div');
    productPriceWrapper.classList.add('product-item__price-container');
    productPriceWrapper.innerHTML = `<div class="product-item__price-wrapper"><span>Price</span><span class="product-item__price">$ ${product.price}</span></div>`;
    productPriceWrapper.append(productLikeBtn);

    productInfoWrapper.append(productTitle, productDesc, productCategoryWrapper, productPriceWrapper);

    productContainer.append(productImgContainer, productInfoWrapper);

    return productContainer;
};

const renderProducts = (container, products) => {
    container.innerHTML = null;

    products.forEach(productEl => {
        container.append(getProduct(productEl));
    });
};

fetch('https://api.escuelajs.co/api/v1/products')
  .then(response => response.json())
  .then(fetchedProducts => {
    allProducts = fetchedProducts;
    console.log('fetchedProducts', fetchedProducts);
    renderProducts(productsContainer, allProducts);
  });

