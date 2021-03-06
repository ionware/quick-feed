const joiError = require('../helpers/joi-errors-map');
const StoryService = require('../services/story.service');
const addStoryValidator = require('../validators/story.validate');

exports.post = async (req, res, next) => {
  const {error, value} = addStoryValidator(req.body);
  if (error) {
    const errors = joiError(error);

    return res.status(400).json({
      message: 'You made an incorrect request. Check input fields.',
      errors
    });
  }

  try {
    const story = await StoryService.createStory(value);
    return res.json(story);
  } catch (err) {
    return next(err);
  }
};

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

/**
 * Handles deleting a story by Its ID.
 */
exports.delete = async (req, res, next) => {
  const storyId = req.params.id;
  try {
    const response = await StoryService.deleteStory(storyId);
    if (!response) {
      // it is a bad request.
      res.status(400).json({
        message: 'Cannot find a story with specified ID.'
      });
    }
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};
