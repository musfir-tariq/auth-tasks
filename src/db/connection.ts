import { Sequelize } from "sequelize-typescript";

import { User } from "../models/user";
import { Task } from "../models/task";
import { DB } from "../config";

const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  database: DB,
  logging: false,
  models: [User, Task],
});

export default connection;
