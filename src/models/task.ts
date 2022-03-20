import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./user";

@Table({
  timestamps: true,
  tableName: "tasks",
})
export class Task extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number

  @BelongsTo(() => User)
  user!: User
}
