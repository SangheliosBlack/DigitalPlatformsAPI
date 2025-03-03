import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Rating_Improvements_Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    active:{
      type:Boolean,
      required:true,
    },
    value:{
      type:Number,
      required:true,
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
