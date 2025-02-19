import Router from 'express';
import passport from 'passport';

import ReleasesController from '../controllers/releases.js';
import checkPermissions from '../middlewares/checkPermissions.js';

import validateMongoId from '../middlewares/validateMongoId.js';
import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/releases/index.js'

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get("/", checkPermissions('read','all'), ReleasesController.getReleases);

router.get("/:id", checkPermissions('read','all'),validateMongoId, ReleasesController.getRelease);

router.post("/", checkPermissions('read','all'),validateSchema(validator.releasesCreateSchema), ReleasesController.createRelease);

router.patch("/:id", checkPermissions('read','all'),validateMongoId, validateSchema(validator.releasesUpdateSchema) ,ReleasesController.updateRelease);

router.delete("/:id", checkPermissions('read','all'),validateMongoId, ReleasesController.deleteRelease);

export default router;