import express from 'express';
import * as controller from "../controllers/product.controllers.js"; 
import { isAuth } from '../middlewares/isAuth.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
import logger from '../utils/logger.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *       properties:
 *         pid:
 *           type: string
 *           description: ID del producto
 *         title:
 *           type: string
 *           description: Título del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         code:
 *           type: string
 *           description: Código del producto
 *         stock:
 *           type: number
 *           description: Cantidad en stock
 *         status:
 *           type: boolean
 *           description: Estado del producto (activo o inactivo)
 *         category:
 *           type: string
 *           description: Categoría del producto
 *         thumbnail:
 *           type: string
 *           description: URL de la imagen del producto
 *         owner:
 *           type: string
 *           description: ID del propietario del producto
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", (req, res, next) => {
    logger.info('GET /products request received');
    controller.getAll(req, res, next)
        .then(result => {
            logger.info('GET /products request successful');
        })
        .catch(error => {
            logger.error(`GET /products request failed: ${error.message}`);
            next(error);
        });
});

/**
 * @swagger
 * /products/{pid}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalles del producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:pid", (req, res, next) => {
    logger.info(`GET /products/${req.params.pid} request received`);
    controller.getById(req, res, next)
        .then(result => {
            logger.info(`GET /products/${req.params.pid} request successful`);
        })
        .catch(error => {
            logger.error(`GET /products/${req.params.pid} request failed: ${error.message}`);
            next(error);
        });
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/", isAuth, (req, res, next) => {
    logger.info('POST /products request received');
    controller.create(req, res, next)
        .then(result => {
            logger.info('POST /products request successful');
        })
        .catch(error => {
            logger.error(`POST /products request failed: ${error.message}`);
            next(error);
        });
});

/**
 * @swagger
 * /products/{pid}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:pid", isAuth, (req, res, next) => {
    logger.info(`PUT /products/${req.params.pid} request received`);
    controller.update(req, res, next)
        .then(result => {
            logger.info(`PUT /products/${req.params.pid} request successful`);
        })
        .catch(error => {
            logger.error(`PUT /products/${req.params.pid} request failed: ${error.message}`);
            next(error);
        });
});

/**
 * @swagger
 * /products/{pid}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:pid", isAuth, (req, res, next) => {
    logger.info(`DELETE /products/${req.params.pid} request received`);
    controller.remove(req, res, next)
        .then(result => {
            logger.info(`DELETE /products/${req.params.pid} request successful`);
        })
        .catch(error => {
            logger.error(`DELETE /products/${req.params.pid} request failed: ${error.message}`);
            next(error);
        });
});

/**
 * @swagger
 * /mockingproducts:
 *   post:
 *     summary: Crea productos simulados (solo admins)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Productos simulados creados con éxito
 *   get:
 *     summary: Obtiene productos simulados (solo admins)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos simulados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.route('/mockingproducts')
    .post(isAuth, checkAdmin, (req, res, next) => {
        logger.info('POST /mockingproducts request received');
        controller.createProd(req, res, next)
            .then(result => {
                logger.info('POST /mockingproducts request successful');
            })
            .catch(error => {
                logger.error(`POST /mockingproducts request failed: ${error.message}`);
                next(error);
            });
    })
    .get(isAuth, checkAdmin, (req, res, next) => {
        logger.info('GET /mockingproducts request received');
        controller.getProds(req, res, next)
            .then(result => {
                logger.info('GET /mockingproducts request successful');
            })
            .catch(error => {
                logger.error(`GET /mockingproducts request failed: ${error.message}`);
                next(error);
            });
    });

export default router;
