/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Mapper = require('../helpers/object-mapper');

const Model = mongoose.model('Story');
const PollModel = mongoose.model('Poll');
const FeedModel = mongoose.model('Feed');

class StoryService {
  /**
   * Get some amount of populated stories.
   *
   * @param {object} driver Database driver
   * @param {object} options
   */
  static async getStories(driver = null, options = {}) {
    const model = driver || Model;
    const type = options.type || null;
    const limit = options.limit || 30;
    let page = options.page || 0;
    // Ensure page begins from 0.
    page = page > 0 ? page - 1 : page;

    const pipeline = type
      ? [{$match: {type}}, {$sort: {createdAt: 1}}]
      : [{$sort: {createdAt: 1}}];

    const totalDocumentsMatched = await model
      .aggregate(pipeline.concat({$count: 'total'}))
      .exec();
    const total =
      totalDocumentsMatched.length > 0 ? totalDocumentsMatched[0].total : 0;

    pipeline.push({$skip: limit * page}, {$limit: limit}, {$project: {__v: 0}});

    const stories = await model.aggregate(pipeline).exec();
    const populatedStories = await model.populate(stories, [
      {path: 'poll'},
      {path: 'feed'}
    ]);

    return {
      total: limit,
      pages: Math.ceil(total / limit),
      current_page: page + 1,
      stories: populatedStories
    };
  }

  /**
   * Delete a story by its ID from the database.
   *
   * @param {string} storyId Mongoose ID
   * @param {object} driver Database driver
   */
  static async deleteStory(storyId, driver = null) {
    const model = driver || Model;
    const story = await model.findByIdAndDelete(storyId);
    // Send false if story isn't found.
    if (!story) return false;

    const populatedStory = await model.populate(story, [
      {path: 'poll'},
      {path: 'feed'}
    ]);

    return Mapper.except(populatedStory.toObject(), ['__v']);
  }

  static async createStory(data, driver = null) {
    const storyModel = driver || Model;
    // The general fields for all stories.
    const {type, excerpt} = data;
    const story = await storyModel.create({type, excerpt});
    if (data.type === 'feed') {
      const {description, title} = data;
      const feed = await FeedModel.create({
        description,
        title
      });
      story.feed = feed._id;
      await story.save();
    } else {
      const {options, end, title} = data;
      const poll = await PollModel.create({title, options, end});
      story.poll = poll._id;
      await story.save();
    }

    const populatedStory = await storyModel.populate(story, [
      {path: 'poll'},
      {path: 'feed'}
    ]);

    return Mapper.except(populatedStory.toObject(), ['__v']);
  }
}

module.exports = StoryService;
