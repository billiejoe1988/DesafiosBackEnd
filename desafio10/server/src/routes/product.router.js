import express from 'express';
import * as controller from "../controllers/product.controllers.js"; 
import { isAuth } from '../middlewares/isAuth.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
import logger from '../utils/logger.js';

const router = express.Router();

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

//con user auth
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

//con user auth
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

//con user auth
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
