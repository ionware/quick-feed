const mongoose = require('mongoose');
const router = require('express').Router();

const Story = mongoose.model('Story');

router.get('/', async (req, res) => {
  const stories = await Story.find({});
  res.json(stories);
});

module.exports = router;
