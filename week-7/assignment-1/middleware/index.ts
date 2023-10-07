import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const SECRET: string = 'SECr3t';  // This should be in an environment variable in a real application
interface User {id: string};

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      const {id} = user as User;
      if (err || !id) {
        return res.sendStatus(403);
      }
      req.headers["userId"] = id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
