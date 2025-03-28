import Router from 'express';
import passport from 'passport';

import CommercialFiguresController from '../controllers/commercial_figures.js';
import checkPermissions from '../middlewares/checkPermissions.js';

import validateMongoId from '../middlewares/validateMongoId.js';
import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/commercial_figures/index.js'

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get("/", checkPermissions('read','all'), CommercialFiguresController.getAllCommercialFigures);

router.get("/:id", checkPermissions('read','all'),validateMongoId, CommercialFiguresController.getCommercialFiguresById);

router.post("/", checkPermissions('read','all'),validateSchema(validator.commercialFigureCreateSchema), CommercialFiguresController.createCommercialFigures);

router.patch("/", checkPermissions('read','all'), validateSchema(validator.commercialFigureUpdateSchema) ,CommercialFiguresController.updateCommercialFigures);

router.delete("/:id", checkPermissions('read','all'),validateMongoId, CommercialFiguresController.deleteCommercialFigures);

export default router;