import { NextFunction, Request, Response,  } from "express"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { User } from "../models/user"

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const header: string = req.headers["authorization"] || ''
  const token = header && header.split(' ')[1]

  if (!token) {
    return res.status(403).json({
      message: "No token provided!"
    })
  }
  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized!"
      })
    }
    req.userId = decoded.id
    next()
  })
}

const checkDuplicateUsername = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username) next()

    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "username already taken!"
        })
        return
      }
      next()
    })
}

export default { verifyToken, checkDuplicateUsername }
