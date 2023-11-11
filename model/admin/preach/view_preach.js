const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Preach",
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

const View = mongoose.model("View", viewSchema);

module.exports = View;
