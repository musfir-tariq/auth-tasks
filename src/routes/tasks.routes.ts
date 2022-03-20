import middlewares from "../middlewares";
import * as controller from "../controllers/tasks.controller";
import { Router } from "express"
import { body } from "express-validator";

const auth = middlewares.auth

const router = Router()

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/",
  body("title").isString(),
  body("description").isString(),
  [
    auth.verifyToken,
  ],
  controller.create
);

router.get(
  "/",
  [
    auth.verifyToken,
  ],
  controller.getAll
);

router.get(
  "/:id",
  [
    auth.verifyToken,
  ],
  controller.getOne
);

router.patch(
  "/:id",
  [
    auth.verifyToken,
  ],
  controller.update
);

router.delete(
  "/:id",
  [
    auth.verifyToken,
  ],
  controller.destroy
);

export default router
