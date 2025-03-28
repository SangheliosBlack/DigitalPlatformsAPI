import CommercialFigures from '../models/commercial_figures.js';
import catchAsync from "../utils/catchAsync.js";
import RequestUtil from '../utils/requestUtils.js';

var CommercialFiguresController = {

  getAllCommercialFigures: catchAsync(async (req, res, next) => {
  
      const commercial_figures = await CommercialFigures.find();
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'List of Commercial all figures',commercial_figures));
  
    }),
    getCommercialFiguresById: catchAsync(async (req, res, next) => {
  
      const user = await CommercialFigures.findById(req.params.id);
  
      if(!user){
  
        return res.status(404).json(RequestUtil.prepareSinglprepareResponseResponse('error', {}, 'Commercial Figure not found'));
  
      }
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', user, 'Commercial Figure by id'));
  
    }),
    createCommercialFigures: catchAsync(async (req, res, next) => {
  
      const new_commercial_figure = new CommercialFigures(req.body);

      await new_commercial_figure.save();
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', 'Commercial Figure created successfully',new_commercial_figure));
  
    }),
    updateCommercialFigures: catchAsync(async (req, res, next) => {
  
      const user = await CommercialFigures.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if(!user){
  
        return res.status(404).json(RequestUtil.prepareResponse('error', {}, 'Commercial Figure not found'));
  
      }
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', user, 'User updated'));
  
    }),
    deleteCommercialFigures: catchAsync(async (req, res, next) => {
  
      const user = await CommercialFigures.findByIdAndDelete(req.params.id);
  
      if(!user){
  
        return res.status(404).json(RequestUtil.prepareResponse('error', {}, 'Commercial Figure not found'));
  
      }
  
      res.status(200).json(RequestUtil.prepareResponse('SUCCESS', { ok: true }, 'Commercial Figure deleted'));
  
    })

}

export default CommercialFiguresController;