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
      ref: 'Feed'
    },
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll'
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('Story', storySchema);
