import { Task } from "../models/task";
import { User } from "../models/user";
import bcrypt from 'bcrypt'
import { SALT_ROUNDS, JWT_SECRET } from '../config'

const usernames = ['dev123@gmail.com', 'dev456@gmail.com']
const getPassword = () => bcrypt.hashSync('Helloworld123', SALT_ROUNDS)

const seeder = {
  up: async () => {
    try {
      const users = await Promise.all(
        usernames.map(async (username) => (
          User.create({
            username,
            password: await getPassword()
          })
        ))
      )

      console.log(JSON.stringify({ users }, null, 2))

      await Promise.all(
        users.map((user) => (
          Task.create({
            title: `task-${user.id}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            userId: user.id
          })
        ))
      )
    } catch (error) {
      console.log(JSON.stringify({ error }, null, 2))
    }
  },
  down: async () => {
    try {
      const userIds = (await User.findAll({
        where: {
          username: usernames
        }
      })).map((user) => user.id)

      Task.destroy({
        where: {
          userId: userIds
        }
      })

      User.destroy({
        where: {
          id: userIds
        }
      })

    } catch (error) {
      console.log(JSON.stringify({ error }, null, 2))
    }
  }
}

export default seeder
