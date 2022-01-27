const mongoose = require("mongoose");
const imagesSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },

    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true, collection: "images" }
);

module.exports = mongoose.model("Images", imagesSchema);
