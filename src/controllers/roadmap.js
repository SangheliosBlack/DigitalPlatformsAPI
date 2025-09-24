import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import Constants from '../utils/constants.js';

import RoadmapCategory from '../models/roadmap_category.js';

var RoadmapController = {

  getAllCategories: catchAsync(async (req, res, next) => {

    try {

      const allCategories = await RoadmapCategory.find();

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get All Roadmap Categories',allCategories));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{} ));

    }

  }),
  createCategory: catchAsync(async (req, res, next) => {

    try {

      const { name } = req.body;

      const existCategory = await RoadmapCategory.findOne({name: name});

      if(existCategory){

        return res.status(409).json(RequestUtil.prepareResponse('ERROR', 'Category already exists', {}));

      }

      const newCategory = new RoadmapCategory(req.body);

      await newCategory.save();

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Category created successfully', newCategory));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{} ));

    }

  }),


}

export default RoadmapController;