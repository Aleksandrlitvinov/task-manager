export type FilterTasksType = 'active' | 'all' | 'completed'

export type TodoType = {
  addedDate: string
  id: string
  order: number
  title: string
}

export type TodosType = [] | TodoType[]

export type TodoListsType = {
  currentPage: number
  filter: FilterTasksType
  isLoading: boolean
  portion: number
  todos: TodosType
}
