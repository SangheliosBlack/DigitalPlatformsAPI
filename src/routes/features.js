import Router from 'express';
import passport from 'passport';

import FeaturesController from '../controllers/features.js';
import checkPermissions from '../middlewares/checkPermissions.js';

import validateMongoId from '../middlewares/validateMongoId.js';
import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/features/index.js'

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get("/", checkPermissions('read','all'), FeaturesController.getAllFeatures);

router.get("/:id", checkPermissions('read','all'),validateMongoId, FeaturesController.getFeatures);

router.post("/", checkPermissions('read','all'),validateSchema(validator.featuresCreateSchema), FeaturesController.createFeatures);

router.patch("/:id", checkPermissions('read','all'),validateMongoId, validateSchema(validator.featuresCreateSchema) ,FeaturesController.updateFeatures);

router.delete("/:id", checkPermissions('read','all'),validateMongoId, FeaturesController.deleteFeatures);

export default router;