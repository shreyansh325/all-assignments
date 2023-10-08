import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const SECRET: string = 'SECr3t';  // This should be in an environment variable in a real application
interface User {id?: string};

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, userData) => {
      if (err || !userData || !(userData as User).id) {
        return res.sendStatus(403);
      }
      req.headers["userId"] = (userData as User).id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
