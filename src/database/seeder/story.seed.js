/* eslint-disable import/no-extraneous-dependencies, no-await-in-loop */
const fakerLib = require('faker');
const lodash = require('lodash');
const Story = require('../../models/story.model');
const Feed = require('../../models/feed.model');
const Poll = require('../../models/poll.model');

class StoryCollectionSeeder {
  constructor(faker = null) {
    this.faker = faker || fakerLib;
  }

  async createSub(type) {
    const dataStore = {
      poll: {
        title: this.faker.lorem.sentence(),
        options: [
          this.faker.lorem.word(),
          this.faker.lorem.word(),
          this.faker.lorem.word()
        ]
      },
      feed: {
        title: this.faker.lorem.sentence(),
        description: this.faker.lorem.sentences(4)
      }
    };
    const object =
      type === 'feed'
        ? await Feed.create(dataStore[type])
        : await Poll.create(dataStore[type]);

    return object;
  }

  genStory(id, type = 'feed') {
    return {
      excerpt: this.faker.lorem.sentences(2),
      [type]: id,
      type
    };
  }

  async up(amount) {
    const objectType = ['poll', 'feed'];
    for (let i = 0; i < amount; i += 1) {
      const type = lodash.sample(objectType);
      const typeObject = await this.createSub(type);
      // eslint-disable-next-line no-underscore-dangle
      await Story.create(this.genStory(typeObject._id, type));
    }
    return true;
  }

  static async down() {
    // Yet to implement.
    return true;
  }
}

module.exports = StoryCollectionSeeder;
