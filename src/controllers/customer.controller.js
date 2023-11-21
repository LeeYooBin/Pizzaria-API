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
    const id = req.params.id;
    const customer = await services.readCustomer(id);

    if (!customer) return res.status(404).send({ message: 'Cliente não encontrado.' });
    return res.status(200).send(customer);
  } 
  catch (e) {
    if (e.kind === "Objectid") return res.status(400).send({ message: 'O ID informado está incorreto.' });
    console.error(e);
    return res.status(500).send({ message: 'Erro ao recuperar cliente.' });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).send({ message: "Todos os campos precisam ser preenchidos." });

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
    const id = req.params.id;
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).send({ message: "Todos os campos precisam ser preenchidos." });

    const updatedCustomer = await services.updateCustomer(
      id,
      { name, email, password }
    );

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
    const id = req.params.id;
    const deletedCustomer = await services.deleteCustomer(id);

    if (!deletedCustomer.deletedCount > 0) return res.status(404).send({ message: 'Cliente não encontrado.' });
    return res.status(204).send({ message: 'Cliente excluído.' });
  } 
  catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Erro ao excluir cliente.' });
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
  addOrderToCustomer
}