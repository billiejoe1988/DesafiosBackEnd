import express from "express";

const app = express();

app.get('/', (request, response) => {
    response.json(products);
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`));
