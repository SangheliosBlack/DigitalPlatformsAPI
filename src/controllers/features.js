import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import Constants from '../utils/constants.js';

import Feature from '../models/features.js';
import Improvements from '../models/improvements.js';

var FeaturesController = {

  getFeatures: catchAsync(async (req, res, next) => {

    try {

      const id = req.params.id;

      const feature = await Feature.findById(id);

      if (!feature) {

        return res.status(404).json(RequestUtil.prepareResponse('ERROR', 'Feature not found'));

      }
      
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get Feature by ID successfully', feature));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ));

    }

  }),

  getAllFeatures: catchAsync(async (req, res, next) => {

    try {

      const features = await Feature.find();

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get all Features succesfully ',features));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{} ));

    }

  }),

  createFeatures: catchAsync(async (req, res, next) => {

    try {

      var newFeature = new Feature(req.body);

      const improvements = req.body.list_improvements.map(improvement => new Improvements({title:improvement}));

      newFeature.list_improvements = improvements;

      newFeature.user = req.user.id;

      await newFeature.save();

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Create Features succesfully ',newFeature));

    } catch (error) {

      console.log(error);

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{}));

    }

  }),

  updateFeatures: catchAsync(async (req, res, next) => {

    try {

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Update Features succesfully',{}));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ,{}));

    }

  }),

  deleteFeatures: catchAsync(async (req, res, next) => {

    try {

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Delete Features',{}));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ,{}));

    }

  })
  
}

export default FeaturesController;