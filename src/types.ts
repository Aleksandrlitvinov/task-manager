export type TaskType = {
  addedDate?: string
  id?: string
  isCompleted: boolean
  order?: number
  title: string
}

export type TodoType = {
  id: string
  tasks: TaskType[]
  title: string
}
