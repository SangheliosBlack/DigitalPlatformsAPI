import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Roadmap_Category_Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

Roadmap_Category_Schema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object._id = _id;
    return object;
};

const RoadmapCategory = model("roadmap_Category", Roadmap_Category_Schema);

export default RoadmapCategory;
