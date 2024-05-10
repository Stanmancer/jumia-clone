'use strict';

const productArticle = document.getElementById('product-article');
const aside = document.getElementById('products-container');

async function fakeStore () {
  try {
    const fakeStoreURL = 'https://fakestoreapi.com/products';
    const response = await fetch(fakeStoreURL);
    if (!response.ok) {
      throw new Error(`error status - ${response.status}`);
    }
    const storeData = await response.json();

    populateAside(storeData);
    changeProduct(storeData);

  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

function populateAside (products) {
  for (const product of products) {
    const asideProduct = document.createElement('div');
    asideProduct.classList.add('aside-product');

    asideProduct.innerHTML =
      `<img src="${product.image}" alt="Product Image" class="product-image">
      <div class="product" id="${product.id}">
        <a href="#" class="title view-product-btn"><h3>${product.title}</h3></a>
        <span class="category">${product.category}</span>
        <span class="price">&dollar;<span class="price-actual">${product.price}</span></span>
        <a href="#" class="btn view-product-btn">View product</a>
      </div>`;

    aside.appendChild(asideProduct);
  }
}

function changeProduct (products) {
 const viewProductBtns = document.querySelectorAll('.view-product-btn');

  for (const button of viewProductBtns) {
    button.addEventListener('click', function () {
      const currentProductId = button.parentElement.id;
      const productData = products[currentProductId - 1];

      productArticle.querySelector('#product-image').src = productData.image;
      productArticle.querySelector('#product-title').innerHTML = productData.title;
      productArticle.querySelector('#product-current-price').innerHTML = `&dollar; ${productData.price}`;
      productArticle.querySelector('#product-previous-price').innerHTML = `&dollar; ${(productData.price + (productData.price * (29 / 100))).toFixed(2)}`;
      productArticle.querySelector('#star-rating-inner').style.width = `${(productData.rating.rate / 5) * 100}%`;
      productArticle.querySelector('#star-rating-count').innerHTML = productData.rating.count;
      productArticle.querySelector('#product-description').innerHTML = productData.description;
    });
  }
};

fakeStore();