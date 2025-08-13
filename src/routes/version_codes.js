import Router from 'express';
import passport from 'passport';

import VersionCodesController from '../controllers/version_codes.js';
import checkPermissions from '../middlewares/checkPermissions.js';

import validateMongoId from '../middlewares/validateMongoId.js';
import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/version_codes/index.js'

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get("/", checkPermissions('read','all'), VersionCodesController.getAllVersionCodes);

//router.get("/:id", checkPermissions('read','all'),validateMongoId, VersionCodesController.getVersionCodesById);

router.post("/", checkPermissions('read','all'),validateSchema(validator.versionCodeCreateSchema), VersionCodesController.createVersionCodes);

//router.patch("/", checkPermissions('read','all'), validateSchema(validator.commercialFigureUpdateSchema) ,VersionCodesController.updateVersionCodes);

//router.delete("/:id", checkPermissions('read','all'),validateMongoId, VersionCodesController.deleteVersionCodes);

export default router;