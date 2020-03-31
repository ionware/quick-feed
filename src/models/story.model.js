const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    feed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feed',
      default: null
    },
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
      default: null
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('Story', storySchema);
