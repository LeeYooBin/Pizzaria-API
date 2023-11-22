const mongoose = require('mongoose');

const flavorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

const Flavor = mongoose.model('flavors', flavorSchema);

module.exports = Flavor;