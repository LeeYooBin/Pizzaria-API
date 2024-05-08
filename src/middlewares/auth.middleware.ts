import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import UserService from "../services/user.service";

interface AuthRequest extends Request {
  userID?: string;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: "Token not provided" });

  const parts = authHeader.split(" ");

  if (parts.length !== 2) return res.status(401).send({ message: "Invalid Token" });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema)) return res.status(401).send({ message: "Token poorly formatted" });

  jwt.verify(token, process.env.JWT_SECRET as string, async (e: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
    if (e || typeof decoded === "string") {
      console.log(e);
      return res.status(500).send({ message: "Internal error" });
    }

    const userID: string = (decoded as JwtPayload).userID;
    const user = await UserService.getUserByID(userID);

    if (!user || !userID) return res.status(401).send({ message: "Invalid Token" });

    req.userID = userID;

    return next();
  });
};

export default authMiddleware;
