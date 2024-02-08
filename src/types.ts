export type TaskTypeDTO = {
  addedDate?: string
  id: string
  isCompleted: boolean
  order?: number
  title: string
}

export type TodoType = {
  id: string
  tasks: TaskTypeDTO[]
  title: string
}
