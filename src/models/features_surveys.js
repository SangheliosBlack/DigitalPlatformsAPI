import mongoose  from "mongoose";

const { Schema,model } = mongoose;

const Feature_Survey_Schema = new Schema(
  {
    rating_feature: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    comment: {
      type: String,
      required: false,
      trim: false
    },
    feature:{
      type: Schema.Types.ObjectId,
      ref: "features",
      required: true
    },
    anonymous:{
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

Feature_Survey_Schema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object._id = _id;
  return object;
};

const FeatureSurveys = model("features_surveys",Feature_Survey_Schema);

export default FeatureSurveys;

