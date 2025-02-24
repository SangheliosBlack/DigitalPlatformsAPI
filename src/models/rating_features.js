import { bool, required } from "joi";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Rating_Improvements_Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type:{
      type:int,
      required:true,
    },
    active:{
      type:Boolean,
      required:true
    },
  }
);

Rating_Improvements_Schema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
};

const RatingImprovements = model("rating_improvements", Rating_Improvements_Schema);

export default RatingImprovements;
