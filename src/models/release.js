import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Release_Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    image_url: {
      type: String,
      required: false,
      default: null
    },
    media_url: {
      type: String,
      required: false,
      default: null
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    quarter: {
      type: Number,
      required: true
    },
    commercial_figure: {
      type: Schema.Types.ObjectId,
      ref: "commercial_figures",
      required: true
    },
    version_code: {
      type: Schema.Types.ObjectId,
      ref: "version_codes",
      required: true,
    }
  },
  {
    timestamps: true
  }
);

Release_Schema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object._id = _id;
    return object;
};

const Release = model("releases", Release_Schema);

export default Release;
