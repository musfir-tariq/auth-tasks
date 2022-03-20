import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Task } from "./task";

@Table({
  timestamps: true,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Task)
  tasks!: Task[]
}
