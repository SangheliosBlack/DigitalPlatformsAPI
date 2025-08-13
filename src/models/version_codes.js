import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Version_Codes_Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true
    },
    active:{
      type:Boolean,
      required:true,
      default :true
    },
  },
  {
    timestamps: true
  }
);

Version_Codes_Schema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object._id = _id;
  return object;
};

const VersionCodes = model("version_codes", Version_Codes_Schema);

export default VersionCodes;
