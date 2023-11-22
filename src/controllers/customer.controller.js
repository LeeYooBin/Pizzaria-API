const mongoose = require("mongoose");
const services = require("../services/customer.service");

const findAllCustomers = async (_, res) => {
  try {
    const customers = await services.readAllCustomers();
    return res.status(200).send(customers);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao recuperar clientes.' });
  }
};

const findCustomerById = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const customer = await services.readCustomer(id);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID de cliente inválido.' });

    if (!customer) return res.status(404).send({ message: "Cliente não encontrado." }); 
    return res.status(200).send(customer);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao recuperar cliente.' });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).send({ message: "Todos os campos precisam ser preenchidos." });

    const existingEmail = await services.findCustomerByEmail(email);
    if (existingEmail) return res.status(409).send({ message: "O email já está em uso." });

    const newCustomer = {
      name,
      email,
      password,
      createdAt: new Date(),
      admin: false
    };

    const customer = await services.createCustomer(newCustomer);
    return res.status(201).send(customer);
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao criar cliente.' });
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const { name, email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID de cliente inválido.' });

    if (!name || !email || !password) return res.status(400).send({ message: "Todos os campos precisam ser preenchidos." });
    
    const existingEmail = await services.findAnotherCustomerByEmail(email, id);
    if (existingEmail) return res.status(409).send({ message: "O email já está em uso por outro cliente." });
    
    const updatedCustomer = await services.updateCustomer(id, { name, email, password });

    if (updatedCustomer) return res.status(200).send(updatedCustomer);
    else return res.status(404).send({ message: 'Cliente não encontrado.' });
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao atualizar cliente.' });
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID de cliente inválido.' });

    await services.deleteCustomer(id);
    return res.status(204).send({ message: "Cliente excluido." });
  } 
  catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Erro ao excluir cliente.' });
  }
};

const loginService = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await services.findCustomerByEmail(email);

    if (!customer || password !== customer.password) return res.status(400).send({ message: "Email ou senha inválida" });

    const token = services.generateToken(customer._id, process.env.SECRET);
    res.status(200).send({
      customer,
      token
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Não foi possível realizar o login" });
  }
};

const addOrderToCustomer = async (customerId, orderId) => {
  try {
    await services.addOrder(customerId, orderId)
  } 
  catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  findCustomerById,
  findAllCustomers,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
  addOrderToCustomer,
  loginService
}