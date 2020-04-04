const StoryService = require('../services/story.service');

exports.get = async (req, res, next) => {
  const options = {
    type: req.query.type
  };
  if (req.query.limit) {
    options.limit = parseInt(req.query.limit, 10);
  }
  if (req.query.page) {
    options.page = parseInt(req.query.page, 10);
  }
  try {
    const response = await StoryService.getStories(null, options);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
