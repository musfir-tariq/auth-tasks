import middlewares from "../middlewares";
import * as controller from "../controllers/auth.controller";
import { Router } from "express"
import { body } from 'express-validator';

const router = Router()
const auth = middlewares.auth

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  body('username').isString(),
  body('password').isLength({ min: 8 }),
  [
    auth.checkDuplicateUsername,
  ],
  controller.signUp
);

router.post(
  "/signin",
  body('username').isString(),
  body('password').isLength({ min: 8 }),
  controller.signIn
);

export default router
