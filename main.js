
const productsContainer = document.querySelector('#products-section');

let allProducts = [];

const getImgSlider = (images) => {
    let activeSlideIndex = 0;

    const productImgContainer = document.createElement('div');
    productImgContainer.classList.add('product-item__img-container');
    
    const productImgSlider = document.createElement('div');
    productImgSlider.classList.add('product-item__img-slider');

    const sliderImagesEl = images.map((image, i) => {
        const productImg = document.createElement('img');

        const classList = ['product-item__img', 'product-item__img-slide'];
        if (i === activeSlideIndex) {
            classList.push('product-item__img-slide_active');
        }

        productImg.classList.add(...classList);
        productImg.src = image;
        productImg.referrerPolicy = "no-referrer";

        productImg.onerror = () => {
            productImg.src = 'https://placehold.co/600x400';
        };

        return productImg;
    });

    sliderImagesEl.forEach(imgEl => {
        productImgSlider.append(imgEl);
    })

    const productImgSliderPrev = document.createElement('div');
    productImgSliderPrev.classList.add('product-item__img-slider-btn', 'product-item__img-slider-prev');
    productImgSliderPrev.innerHTML = '<';

    const productImgSliderNext = document.createElement('div');
    productImgSliderNext.classList.add('product-item__img-slider-btn', 'product-item__img-slider-next');
    productImgSliderNext.innerHTML = '>';

    productImgSliderPrev.addEventListener('click', () => {
        sliderImagesEl[activeSlideIndex].classList.remove('product-item__img-slide_active');

        activeSlideIndex = activeSlideIndex === 0 ? sliderImagesEl.length - 1 : --activeSlideIndex;
        sliderImagesEl[activeSlideIndex].classList.add('product-item__img-slide_active');
    });

    productImgSliderNext.addEventListener('click', () => {
        sliderImagesEl[activeSlideIndex].classList.remove('product-item__img-slide_active');

        activeSlideIndex = activeSlideIndex === sliderImagesEl.length - 1 ? 0 : ++activeSlideIndex;
        sliderImagesEl[activeSlideIndex].classList.add('product-item__img-slide_active');
    });

    productImgContainer.append(productImgSlider, productImgSliderPrev, productImgSliderNext);

    return productImgContainer;
};

const getProduct = (product) => {
    const productContainer = document.createElement('div');
    productContainer.classList.add('products-section__item', 'product-item');

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

    productContainer.append(getImgSlider(product.images), productInfoWrapper);

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

