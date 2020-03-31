const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    votes: {
      type: Array,
      required: true
    },
    end: {
      type: Date
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('Poll', pollSchema);
