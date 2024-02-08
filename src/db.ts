export const TASKS: TaskType[] = [
  {
    addedDate: '2019-07-30T12:23:49.677',
    id: 'a2dfe62b-ebce-4b37-9581-1cc77ebc999f',
    order: 0,
    title: 'not important',
  },
  {
    addedDate: '2019-07-30T12:23:49.677',
    id: 'a2dfe62b-ebce-4b37-9581-1cc77ebc9d9f',
    order: 0,
    title: 'important',
  },
]
export const TODOS: TodoType[] = [
  {
    id: 'a2dfe62b-ebce-4b37-9581-1cc77ebc9d9d',
    tasks: TASKS,
    title: 'first',
  },
]

export type TaskType = {
  addedDate?: string
  id?: string
  order?: number
  title: string
}

export type TodoType = {
  id: string
  tasks: TaskType[]
  title: string
}
