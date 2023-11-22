const mongoose = require('mongoose');
const service = require("../services/flavor.service");

const createFlavor = async (req, res) => {
  try {
    const { name, ingredients } = req.body;

    if (!name || !ingredients) return res.status(400).send({ message: "Todos os campos precisam ser preenchidos." });

    const existingFlavor = await service.findFlavorByName(name);
    if (existingFlavor) return res.status(409).send({ message: 'Sabor já cadastrado.' });

    const newFlavor = await service.createFlavor({ name, ingredients });
    return res.status(201).send(newFlavor);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao criar sabor.' });
  }
};

const updateFlavor = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const { name, ingredients } = req.body;

    if (!name || !ingredients) return res.status(400).send({ message: "Todos os campos precisam ser preenchidos." });

    const existingFlavor = await service.findAnotherFlavorByName(name, id);
    if (existingFlavor) return res.status(409).send({ message: 'Sabor já cadastrado.' });
    

    const updatedFlavor = await service.updateFlavor(id, { name, ingredients });

    if (!updatedFlavor) return res.status(404).send({ message: 'Sabor não encontrado.' });
    
    return res.status(200).send(updatedFlavor);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao atualizar sabor.' });
  }
};

const findFlavorByName = async (req, res) => {
  try {
    const { name } = req.body;
    const flavor = await service.findFlavorByName(name);

    if (!flavor) return res.status(404).send({ message: "Sabor não encontrado." }); 
    return res.status(200).send(flavor);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao recuperar sabor.' });
  }
};

const findAllFlavors = async (_, res) => {
  try {
    const flavors = await service.readAllFlavors();
    return res.status(200).send(flavors);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao recuperar sabores.' });
  }
};

const deleteFlavor = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const deletedFlavor = await service.deleteFlavor(id);

    if (!deletedFlavor) return res.status(404).send({ message: 'Sabor não encontrado.' });
    
    return res.status(204).send();
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao excluir sabor.' });
  }
};

module.exports = {
  createFlavor,
  updateFlavor,
  findAllFlavors,
  findFlavorByName,
  deleteFlavor,
};