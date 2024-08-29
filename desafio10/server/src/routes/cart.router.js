import { Router } from "express";
import CartController from '../controllers/cart.controller.js';
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
const controller = new CartController();

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - products
 *         - totalPrice
 *       properties:
 *         id:
 *           type: string
 *           description: ID del carrito
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del producto
 *         totalPrice:
 *           type: number
 *           description: Precio total del carrito
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Obtiene todos los carritos
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de carritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */
router.get("/", [checkAuth, checkAdmin], controller.getAll);

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Obtiene un carrito por ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrito no encontrado
 */
router.get("/:id", [checkAuth], controller.getById);

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Crea un nuevo carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Carrito creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.post("/", [checkAuth, checkAdmin], controller.create);

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Actualiza un carrito existente
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrito no encontrado
 */
router.put("/:id", [checkAuth, checkAdmin], controller.update);

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Elimina un carrito por ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito eliminado con éxito
 *       404:
 *         description: Carrito no encontrado
 */
router.delete("/:id", [checkAuth, checkAdmin], controller.delete);

/**
 * @swagger
 * /carts/products/{idProd}:
 *   post:
 *     summary: Agrega un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProd
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto agregado al carrito con éxito
 */
router.post("/products/:idProd", [checkAuth], controller.addProdToCart);

/**
 * @swagger
 * /carts/{idCart}/products/{idProd}:
 *   delete:
 *     summary: Elimina un producto del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCart
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *       - in: path
 *         name: idProd
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito con éxito
 *       404:
 *         description: Producto o carrito no encontrado
 */
router.delete("/:idCart/products/:idProd", [checkAuth], controller.removeProdToCart);

/**
 * @swagger
 * /carts/{idCart}/products/{idProd}:
 *   put:
 *     summary: Actualiza la cantidad de un producto en el carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCart
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *       - in: path
 *         name: idProd
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Cantidad actualizada con éxito
 *       404:
 *         description: Producto o carrito no encontrado
 */
router.put("/:idCart/products/:idProd", [checkAuth], controller.updateProdQuantityToCart);

/**
 * @swagger
 * /carts/clear/{idCart}:
 *   delete:
 *     summary: Elimina todos los productos de un carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCart
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito limpiado con éxito
 *       404:
 *         description: Carrito no encontrado
 */
router.delete("/clear/:idCart", [checkAuth], controller.clearCart);

export default router;
