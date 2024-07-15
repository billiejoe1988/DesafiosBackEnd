const socket = io();

const form = document.getElementById('product-form');
const inputName = document.getElementById('name');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputThumbnail = document.getElementById('thumbnail');
const inputCode = document.getElementById('code');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');
const errorDisplay = document.getElementById('error-message');
const productsList = document.getElementById('products-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!inputName.value || !inputDescription.value || !inputPrice.value || !inputThumbnail.value || !inputCode.value || !inputStock.value || !inputCategory.value) {
        errorDisplay.textContent = "Todos los campos son obligatorios.";
        return;
    }

    const product = {
        title: inputName.value,
        description: inputDescription.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value,
        code: inputCode.value,
        stock: inputStock.value,
        category: inputCategory.value
    };

    errorDisplay.textContent = "";

    socket.emit('newProduct', product);

    form.reset();
});

socket.on('products', (products) => {
    productsList.innerHTML = '';
    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - $${product.price}`;
        productsList.appendChild(li);
    });
});
