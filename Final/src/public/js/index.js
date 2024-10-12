const socketClient = io();

const productDiv = document.getElementById("productDiv");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  //alert("actualizado");
  socketClient.emit("productUpdate");
});

socketClient.on("products", (data) => {
  const productsList = data
    .map((prod) => {
      return ` <div id="card" style="display: flex; flex-direction: row; background-color: white; border-radius: 10px 10px; margin: 4px;  ">

                <img id="cardImg" src= ${prod.img} style="width: 150px; border-radius: 10px;" />
                <div id="cardDescription" style="padding: 5px; margin-left: 15px;">
    
                    <h4 id="title" > ${prod.title}</h4>
                    <h4 id="description" > ${prod.description} </h4>
                    <h4 id="precio">Precio: $${prod.price} </h4>
                    <h4 id="stock">Stock: ${prod.stock} </h4>
                </div>
              </div>`;
    })
    .join(" ");

  productDiv.innerHTML = productsList;
});
