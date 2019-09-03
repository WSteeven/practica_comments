const Publication = require('../models/publication');

module.exports = {

  async popular() {
    const publications = await Publication.find().limit(9).sort({likes: -1});
    return publications;
  }

};
