const Flavor = require("../models/flavor.model");

const createFlavor = (flavor) => {
  return Flavor.create(flavor);
};

const readAllFlavors = () => {
  return Flavor.find();
}

const updateFlavor = (flavorId, updatedFlavor) => {
  return Flavor.findByIdAndUpdate(flavorId, updatedFlavor, { returnDocument: "after" });
};

const deleteFlavor = (flavorId) => {
  return Flavor.findByIdAndDelete(flavorId);
};

const findFlavorByName = (name) => {
  return Flavor.findOne({ name });
}

const findAnotherFlavorByName = (name, flavorId) => {
  return Flavor.findOne({ name, _id: { $ne: flavorId } });
}

module.exports = {
  createFlavor,
  readAllFlavors,
  updateFlavor,
  deleteFlavor,
  findFlavorByName,
  findAnotherFlavorByName
};