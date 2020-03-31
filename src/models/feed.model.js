const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('Feed', feedSchema);
