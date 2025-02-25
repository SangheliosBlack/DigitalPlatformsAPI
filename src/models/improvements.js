import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Improvements_Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    }
  }
);

Improvements_Schema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
};

const Improvements = model("improvements", Improvements_Schema);

export default Improvements;
