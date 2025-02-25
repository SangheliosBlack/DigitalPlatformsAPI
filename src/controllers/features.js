import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import Constants from '../utils/constants.js';

import Feature from '../models/features.js';
import FeatureSurvery from '../models/features_surveys.js';
import Improvements from '../models/improvements.js';

var FeaturesController = {

  getFeatureById: catchAsync(async (req, res, next) => {

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

      const features = await Feature.aggregate([
        {
          $lookup: {
            from: "features_surveys",
            localField: "_id",
            foreignField: "feature", 
            as: "surveyData"
          }
        },
        {
          $addFields: {
            survey_quantity: {
              $cond: {
                if: { $eq: [{ $size: "$surveyData" }, 0] }, 
                then: 0, 
                else: { 
                  $size: "$surveyData" 
                }
              }
            },
            survey_average: {
              $cond: {
                if: { $eq: [{ $size: "$surveyData" }, 0] },
                then: 0, 
                else: {
                  $round: [{ $multiply: [{ $avg: "$surveyData.rating_feature_type" }, 5] }, 2]
                }
              }
            }
          }
        },
        {
          $project: {
            surveyData: 0 
          }
        },
        {
          $lookup: {
            from: "users", 
            localField: "user",
            foreignField: "_id",
            as: "user"
          },
        },
        {
          $project: {
            title: 1,
            status: 1,
            list_improvements: 1,
            _id: 1,
            createdAt: 1,
            updatedAt: 1,
            "user._id": 1,
            "user.full_name": 1,
            "user.image_url": 1,
            survey_quantity: 1,
            survey_average: 1,
          }
        },
        {
          $unwind: "$user" 
        }
      ]);

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get all Features succesfully',features));

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