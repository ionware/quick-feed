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
      required: false
    },
    end: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 86400000) // Ends in 24hrs time
    }
  },
  {timestamps: true}
);

// eslint-disable-next-line func-names
pollSchema.pre('save', function (next) {
  // Create vote counts for poll options.
  this.votes = this.options.map(() => 0);
  next();
});

module.exports = mongoose.model('Poll', pollSchema);
