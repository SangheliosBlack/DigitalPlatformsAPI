import Router from "express";
import passport from "passport";

import RoadmapController from "../controllers/roadmap.js";
import checkPermissions from '../middlewares/checkPermissions.js';

import validateSchema from '../middlewares/validateSchema.js';
import validator from '../validators/roadmap/index.js'

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get("/", checkPermissions('read','all'), RoadmapController.getAllCategories);

router.post("/", checkPermissions('read','all'),validateSchema(validator.roadmapCreateValidator),RoadmapController.createCategory);

export default router;