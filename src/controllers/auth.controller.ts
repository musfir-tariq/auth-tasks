import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt"
import { SALT_ROUNDS, JWT_SECRET } from "../config";
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";

export const signUp = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return (
    User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, SALT_ROUNDS)
    })
    .then(user => { res.status(200).json({ message: "User was registered successfully!" }) })
    .catch(err => { res.status(500).json({ message: err.message }) })
  )
}

export const signIn = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return (
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(async (user) => {
      if (!user) return res.status(404).json({ message: "User Not found." })

      const isPasswordValid = bcrypt.compareSync(req.body.password, user.getDataValue('password'))

      if (!isPasswordValid) return res.status(401).json({ accessToken: null, message: "Invalid Password!"})

      const token = jwt.sign({ id: user.id }, JWT_SECRET, {});

      res.status(200).json({ id: user.id, accessToken: token })
    })
    .catch(err => { res.status(500).json({ message: err.message }) })
  )
}
