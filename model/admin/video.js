const mongoose = require("mongoose");

const video_schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    views: { type: Number, default: 0 },

    rate: {
      type: [String],
      required: true,
    },
    participate_views: {
      type: [{ user_id: String, timestamp: Number }],
    },
    view_by: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: {
      type: [{ commenter_id: String, text: String, timestamp: Number }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Video = mongoose.model;
module.exports = Video;
