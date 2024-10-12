import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker/locale/es";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

export const generateProduct = () => {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    img: [faker.image.urlLoremFlickr({ category: "products" })],
    code: faker.commerce.isbn(),
    stock: faker.number.int({ min: 10, max: 100 }),
    category: faker.helpers.arrayElement([
      "Cervezas",
      "Vinos",
      "Licores",
      "Tés",
      "Refrescos",
      "Bebidas sin alcohol",
      "Cócteles listos para beber",
      "Cafés",
      "Combos",
    ]),
    faker: true,
  };
};

export const hasBeenMoreThanXTime = (lastConnectionDate) => {
  const dateNow = new Date();
  const diffMs = dateNow - lastConnectionDate;
  const hours48Ms = 48 * 60 * 60 * 1000; //48hs en ms
  const minMs = 60 * 1000; //1 minuto

  return diffMs > hours48Ms; //diferencia es mayor a 48hs en ms
};
