import mongoose from "mongoose";

const publicacion = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "user",
  },

  file: {
    type: String,
    trim: true,
    require: true,
  },

  typeFile: {
    type: String,
    trim: true,
  },

  createAt : {
      type : Date,
      default: Date.now(),
  }
});

const publicacionSchema = mongoose.model("publicacion", publicacion);

export default publicacionSchema;
