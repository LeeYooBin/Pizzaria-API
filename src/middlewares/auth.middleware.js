const jwt = require("jsonwebtoken");
const { readCustomer } = require("../services/customer.service");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: "O token não foi informado" });

  const parts = authHeader.split(" ");

  if (parts.length !== 2) return res.status(401).send({ message: "Token inválido" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema)) return res.status(401).send({ message: "Token malformatado" });

  jwt.verify(token, process.env.SECRET, async (e, decoded) => {
    if (e) {
      console.log(e);
      return res.status(500).send({ message: "Erro interno" });
    }
    const customer = await readCustomer(decoded.customerId);

    if (!customer || !decoded.customerId) return res.status(401).send({ message: "Token inválido" });

    req.customerId = decoded.customerId;
    
    return next();
  });
}