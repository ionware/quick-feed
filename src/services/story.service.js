const mongoose = require('mongoose');

const Model = mongoose.model('Story');

class StoryService {
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
}

module.exports = StoryService;
