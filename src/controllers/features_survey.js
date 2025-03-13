import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import Constants from '../utils/constants.js';

import Feature from '../models/features.js';
import FeatureSurvey from '../models/features_surveys.js';
import RatingImprovements from '../models/rating_features.js';
import mongoose from 'mongoose';

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

      var { rating_feature,feature } = req.body;

      var checkRatingImprovements = await RatingImprovements.findById({_id:rating_feature});

      if(!checkRatingImprovements){

        return res.status(404).json(RequestUtil.prepareResponse('ERROR', 'Rating improvements not found'));

      }

      const featureSurveyByUser = await FeatureSurvey.findOne({ feature: feature, user: req.user.id });

      if (featureSurveyByUser) {

        return res.status(409).json(RequestUtil.prepareResponse('ERROR', 'BUSINESS_ERROR_FEATURE_SURVEY_CREATED_BEFORE'));

      }

      var newFeatureSurvey = new FeatureSurvey(req.body);

      newFeatureSurvey.user = req.user.id;
      newFeatureSurvey.rating_feature = checkRatingImprovements.value;
      newFeatureSurvey.anonymous = false;

      await newFeatureSurvey.save();

      const feature_pipeline = await Feature.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(feature) }
        },
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
          "$round": [{"$multiply": [{"$divide": [{ "$avg": "$surveyData.rating_feature" }, 4]},4]},2]
            }
          }
        },
        survey_max: 4
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
        survey_max: { $literal: 4 },
        description: 1
          }
        },
        {
          $unwind: "$user" 
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

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Create Features Survey succesfully ',feature_pipeline[0]));

    } catch (error) {

      console.log(error);

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{}));

    }

  }),

  updateFeaturesSurvey: catchAsync(async (req, res, next) => {

    var { survey_id,rating_feature} = req.body;

    try {

      const searchFeatureSurvey = await FeatureSurvey.findById({_id:survey_id});

      if (!searchFeatureSurvey) {

        return res.status(404).json(RequestUtil.prepareResponse('ERROR', 'Survey not found'));

      }
      
      var checkRatingImprovements = await RatingImprovements.findById({_id:rating_feature});

      if(!checkRatingImprovements){

        return res.status(404).json(RequestUtil.prepareResponse('ERROR', 'Rating improvements not found'));

      }

      searchFeatureSurvey.rating_feature = checkRatingImprovements.value || searchFeatureSurvey.rating_feature;
      searchFeatureSurvey.comment = req.body.comment || searchFeatureSurvey.comment;

      await searchFeatureSurvey.save();

      const feature_pipeline = await Feature.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(searchFeatureSurvey.feature) }
        },
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
          "$round": [{"$multiply": [{"$divide": [{ "$avg": "$surveyData.rating_feature" }, 4]},4]},2]
            }
          }
        },
        survey_max: 4
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
        survey_max: { $literal: 4 },
        description: 1
          }
        },
        {
          $unwind: "$user" 
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

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Update Features Survey successfully', feature_pipeline[0]));

    } catch (error) {

      console.log(error);

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