import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';
import Constants from '../utils/constants.js';

import UploadService from "../services/azureUploadService.js";

import Release from '../models/release.js';

var ReleasesController = {

  getAllReleases: catchAsync(async (req, res, next) => {

    try {

      const allReleases = await Release.find().populate('user', "full_name image_url").populate('version_code','code') .sort({ createdAt: -1 });

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get Releases',allReleases));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{} ));

    }

  }),

  getRelease: catchAsync(async (req, res, next) => {

    try {

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Get Release',{}));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{} ));

    }

  }),

  createRelease: catchAsync(async (req, res, next) => {

    try {

      const fileUrl = await UploadService.uploadFile(req.file);

      var newRelease = new Release(req.body);

      newRelease.image_url = fileUrl;
      newRelease.user = req.user.id;
      newRelease.version_code = req.version_code
      
      await newRelease.save();
      
      const getNewRelease = await Release.findById({_id:newRelease.id}).populate('user',"full_name image_url").populate('version_code','code');

      res.status(201).json(RequestUtil.prepareResponse('SUCCESS', 'Release created successfully', getNewRelease));

    } catch (error) {

      console.log(error);

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message,{}));

    }

  }),

  updateRelease: catchAsync(async (req, res, next) => {

    try {

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Update Release',{}));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ,{}));

    }

  }),

  deleteRelease: catchAsync(async (req, res, next) => {

    try {

      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Delete Release',{}));

    } catch (error) {

      res.status(500).json(RequestUtil.prepareResponse('error', error.response?.data.message ,{}));

    }

  })
  
}

export default ReleasesController;