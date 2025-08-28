import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import Constants from '../utils/constants.js';

import Feature from '../models/features.js';
import FeatureSurvery from '../models/features_surveys.js';
import Improvements from '../models/improvements.js';
import RatingImprovements from '../models/rating_features.js';

import mongoose from "mongoose";

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

  migrateFeatures: catchAsync(async (req, res, next) => {

    try {
      const codeVersionId = new mongoose.Types.ObjectId("689c8082700ee488a2890535");
      //const codeVersionId = new mongoose.Types.ObjectId("689c7f510d05dee5029c05da");
      const result = await Feature.updateMany(
        {},
        { $set: { version_code: codeVersionId } }
      );
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Migrated features with code_version', result));
    } catch (error) {
      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message, {}));
    }

  }),

  getAllFeatures: catchAsync(async (req, res, next) => {

    try {

      const { version } = req.query;

      let matchStage = {};  

      if (version) {
        matchStage = { version_code: mongoose.Types.ObjectId.createFromHexString(version) };
      }

      const features = await Feature.aggregate([
        { $match: matchStage },
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
          "$round": [{"$multiply": [{"$divide": [{ "$avg": "$surveyData.rating_feature" }, 4]},4]},2
          ]
            }
          }
        },
        surver_max: 4
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
        commercial_figure: 1,
        survey_max: { $literal: 4 },
        version_code:1,
        description: 1
          }
        },
        {
          $unwind: "$user" 
        },
        {
          $lookup: {
        from: "version_codes", 
        localField: "version_code",
        foreignField: "_id",
        as: "version_code"
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
        user: 1,
        survey_quantity: 1,
        survey_average: 1,
        commercial_figure: 1,
        survey_max: { $literal: 4 },
        "version_code._id": 1,
        "version_code.code": 1,
        description: 1,
          }
        },
        {
          $unwind: "$version_code" 
        },
        {
          $sort: { createdAt: -1 } 
        },
        {
          $lookup: {
            from: "rating_improvements",
            pipeline: [
              {
                $match: {}
              }
            ],
            as: "answers"
          }
        },
        {
          $lookup: {
            from: "features_surveys",
            let: { featureId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$feature", "$$featureId"] },
                      { $eq: ["$user", new mongoose.Types.ObjectId(req.user.id)] }
                    ]
                  }
                }
              },
              {
                $project: {
                  _id: 1, 
                  comment: 1,
                  feature: 1,
                  rating_feature: 1,
                  createdAt: 1
                }
              }
            ],
            as: "answer_survey"
          }
        },
        {
          $unwind: {
            path: "$answer_survey",
            preserveNullAndEmptyArrays: true 
          }
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

      const improvements = req.body.list_improvements
        .filter(improvement => improvement.split(' ').length > 1)
        .map(improvement => new Improvements({title: improvement}));

      newFeature.list_improvements = improvements;

      newFeature.user = req.user.id;

      await newFeature.save();

      var feature = await Feature.findById(newFeature.id).populate('user', 'id full_name image_url').populate('version_code', 'id code');

      const answers = await RatingImprovements.find();

      let featureObj = feature.toObject(); 

      featureObj.survey_quantity = 0;
      featureObj.survey_average = 0;
      featureObj.survey_max = 4;
      featureObj.answers = answers;

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Create Features succesfully ',featureObj));

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