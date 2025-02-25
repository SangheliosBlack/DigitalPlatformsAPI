import Router from 'express';
import passport from 'passport';

import FeaturesSurveyController from '../controllers/features_survey.js';
import checkPermissions from '../middlewares/checkPermissions.js';

import validateMongoId from '../middlewares/validateMongoId.js';
import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/features_survey/index.js'

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get("/", checkPermissions('read','all'), FeaturesSurveyController.getAllFeaturesSurvey);

router.get("/:id", checkPermissions('read','all'),validateMongoId, FeaturesSurveyController.getFeaturesSurvey);

router.get('/byFeature/:id', checkPermissions('read','all'),validateMongoId, FeaturesSurveyController.getFeaturesSurveyByFeature);

router.post("/", checkPermissions('read','all'),validateSchema(validator.featureSurveyCreateSchema), FeaturesSurveyController.createFeaturesSurvey);

router.patch("/:id", checkPermissions('read','all'),validateMongoId, validateSchema(validator.featureSurveyCreateSchema) ,FeaturesSurveyController.updateFeaturesSurvey);

router.delete("/:id", checkPermissions('read','all'),validateMongoId, FeaturesSurveyController.deleteFeaturesSurvey);

export default router;