import VersionCodes from '../models/version_codes.js';
import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';

var VersionCodesController = {

  getAllVersionCodes: catchAsync(async (req, res, next) => {
  
      const version_codes = await VersionCodes.find();
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'List of Version Codes',version_codes));
  
    }),
    getVersionCodesById: catchAsync(async (req, res, next) => {
  
      const version_code = await VersionCodes.findById(req.params.id);
  
      if(!version_code){
  
        return res.status(404).json(RequestUtil.prepareSinglprepareResponseResponse('error', {}, 'Codes version Figure not found'));
  
      }
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', version_code, 'Codes version by id'));
  
    }),
    createVersionCodes: catchAsync(async (req, res, next) => {
  
      const new_version_code = new VersionCodes(req.body);

      await new_version_code.save();
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Codes version created successfully',new_version_code));
  
    }),
    updateVersionCodes: catchAsync(async (req, res, next) => {
  
      const version_code = await VersionCodes.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if(!version_code){
  
        return res.status(404).json(RequestUtil.prepareResponse('error', {}, 'Codes version not found'));
  
      }
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', version_code, 'Codes version updated'));
  
    }),
    deleteVersionCodes: catchAsync(async (req, res, next) => {
  
      const version_code = await VersionCodes.findByIdAndDelete(req.params.id);
  
      if(!version_code){
  
        return res.status(404).json(RequestUtil.prepareResponse('error', {}, 'Codes version not found'));
  
      }
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', { ok: true }, 'Codes version deleted'));
  
    })

}

export default VersionCodesController;