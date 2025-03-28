import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Commercial_Figures_Schema = new Schema(
  {
    name:{
      type:String,
      required: true,
      trim: true
    }
  }
);

Commercial_Figures_Schema.method.toJson = function () {



};

const Commercial_Figures = model("commercial_figures",Commercial_Figures_Schema);

export default Commercial_Figures;