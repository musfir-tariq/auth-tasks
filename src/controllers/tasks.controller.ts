import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { Task } from "../models/task"

export const create = async (req: any, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    await Task.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.userId
    })

    return res.status(200).json({ message: "Task was created successfully!" })

  } catch (error: any) {

    return res.status(500).json({ message: error.message })
  }
}

export const getAll = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const tasks = await Task.findAll({})
    if (!tasks.length) return res.status(404).json({ message: "There are currently no tasks." })

    return res.status(200).json(tasks)

  } catch (error: any) {

    return res.status(500).json({ message: error.message })
  }
}

export const getOne = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params

  try {
    const task = await Task.findOne({
      where: {
        id
      }
    })
    if (!task) return res.status(404).json({ message: "Could not find a task with given id." })

    return res.status(200).json(task)

  } catch (error: any) {

    return res.status(500).json({ message: error.message })
  }
}

export const update = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params

  if (!id)
    return res.status(400).json({ message: "Can not delete task without an id." })

  const { title, description } = req.body

  if (!title && !description)
    return res.status(400).json({ message: "Could not update task without title or description." })

  try {
    const updateResponse = await Task.update(
      {
        title,
        description
      },
      {
        where: { id },
      }
    )
    if (!updateResponse[0])
        return res.status(400).json({ message: `Could not find task with id: ${id}.` })

    return res.status(200).json({ message: "Task successfully updated." })

  } catch (error: any) {

    res.status(500).json({ message: error.message })

  }
}

export const destroy = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params

  if (!id)
    return res.status(400).json({ message: "Can not delete task without an id." })

  try {
    const destroyResponse = await Task.destroy({
      where: {
        id
      }
     })
    if (!destroyResponse)
      return res.status(400).json({ message: `Could not destroy task with id: ${id}.` })

    return res.status(200).json({ message: "Task successfully destroyed!" })

  } catch (error: any) {

    return res.status(500).json({ message: error.message })
  }
}
