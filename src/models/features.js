import mongoose  from "mongoose";

const { Schema,model } = mongoose;

const Feature_Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    list_improvements: [
      {
        title: { type: String, required: true },
        description: { type: String }
      }
    ],
    status:{
      type:Number,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

Feature_Schema.methods.toJSON = function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
};

const Feature = model("features",Feature_Schema);

export default Feature;

