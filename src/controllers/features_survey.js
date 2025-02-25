import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import Constants from '../utils/constants.js';

import Feature from '../models/features.js';
import FeatureSurvey from '../models/features_surveys.js';

var FeaturesSurveyController = {

  getFeaturesSurveyByFeature: catchAsync(async (req, res, next) => {

    try {

      const featureId = req.params.id;

      const features = await FeatureSurvey.find({feature:featureId}).populate('user',"full_name image_url");

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get All Features Survey by Feature Id successfully', features));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ));

    }

  }),

  getFeaturesSurvey: catchAsync(async (req, res, next) => {

    try {

      const id = req.params.id;

      const feature = await Feature.findById(id);

      if (!feature) {

        return res.status(404).json(RequestUtil.prepareResponse('ERROR', 'Feature Survey not found'));

      }
      
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get Feature Survey by ID successfully', feature));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ));

    }

  }),

  getFeatureSurveyByType: catchAsync(async(req,res,next) => {

    try {

      const { type } = req.params;

      if(!type){

        return res.status(400).json(RequestUtil.prepareResponse('ERROR', 'Type Survey must be included'));

      }

      const featuresSurvey = await Feature.find(type);

      if (!featuresSurvey) {

        return res.status(404).json(RequestUtil.prepareResponse('ERROR', 'Feature Survey not found'));

      }

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get Features Survey by ID succesfully ',featuresSurvey));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{} ));

    }

  }),

  getAllFeaturesSurvey: catchAsync(async (req, res, next) => {

    try {

      const featuresSurvey = await FeatureSurvey.find();

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get all Features Survey succesfully ',featuresSurvey));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{} ));

    }

  }),

  createFeaturesSurvey: catchAsync(async (req, res, next) => {

    try {

      var newFeatureSurvey = new FeatureSurvey(req.body);

      newFeatureSurvey.user = req.user.id;

      await newFeatureSurvey.save();

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Create Features Survey succesfully ',newFeatureSurvey));

    } catch (error) {

      console.log(error);

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{}));

    }

  }),

  updateFeaturesSurvey: catchAsync(async (req, res, next) => {

    try {

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Update Features Survey succesfully',{}));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ,{}));

    }

  }),

  deleteFeaturesSurvey: catchAsync(async (req, res, next) => {

    try {

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Delete Features Survey',{}));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ,{}));

    }

  })
  
}

export default FeaturesSurveyController;