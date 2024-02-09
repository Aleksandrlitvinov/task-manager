import React, { ChangeEvent, useState } from 'react'

import { Button, Card, Input, Typography } from '@/components'
import { TaskTypeDTO } from '@/types'
import { Task } from '@/widgets/ui/task'
import { v4 as uuidv4 } from 'uuid'

import s from './taskList.module.scss'

type PropsTaskListType = {
  tasks: [] | TaskTypeDTO[]
  title: string
}

type FilterTasksType = 'active' | 'all' | 'completed'

export const TaskList = (props: PropsTaskListType) => {
  const { title } = props
  const [filterTasks, setFilterTasks] = useState<FilterTasksType>('all')
  const [tasksList, setTasksList] = useState<TaskTypeDTO[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<null | string>(null)
  const addTask = (e: React.FormEvent<HTMLFormElement>, taskTitle: string) => {
    e.preventDefault()
    const newTask = {
      addedDate: '2019-07-30T12:23:49.677',
      id: uuidv4(),
      isCompleted: false,
      order: 3,
      title: taskTitle,
    }

    if (taskTitle.trim() === '') {
      setError('title is required')
    } else {
      setTasksList([newTask, ...tasksList])
    }

    setInputValue('')
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onValueChangeHandler = (taskTitle: string) => {
    setError(null)
    setInputValue(taskTitle)
  }

  let tasksForTodo = tasksList

  if (filterTasks === 'active') {
    tasksForTodo = tasksList.filter(t => !t.isCompleted)
  } else if (filterTasks === 'completed') {
    tasksForTodo = tasksList.filter(t => t.isCompleted)
  }
  const onAllClickHandler = () => setFilterTasks('all')
  const onActiveClickHandler = () => setFilterTasks('active')
  const onCompletedClickHandler = () => setFilterTasks('completed')

  return (
    <Card>
      <Typography className={s.title} variant={'h2'}>
        {title}
      </Typography>
      <form
        onSubmit={e => addTask(e, inputValue)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 0 10px',
          width: '230px',
        }}
      >
        <Input
          error={error}
          onChange={onChangeHandler}
          onValueChange={onValueChangeHandler}
          placeholder={'Enter task title'}
          type={'text'}
          value={inputValue}
        />
        <Button variant={'info'}>+</Button>
      </form>
      <div>
        {tasksForTodo.map(t => {
          const removeTask = (id: string) => {
            setTasksList(tasksList.filter(t => t.id !== id))
          }

          const onChangeStatus = (id: string, isDone: boolean) => {
            const currentTask = tasksList.find(t => t.id === id)

            if (currentTask != null) {
              currentTask.isCompleted = isDone
            }

            setTasksList([...tasksList])
          }

          return (
            <Task
              id={t.id}
              isCompleted={t.isCompleted}
              key={t.id}
              onChangeStatus={onChangeStatus}
              removeTask={removeTask}
              title={t.title}
            />
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
        <Button onClick={onAllClickHandler} variant={'success'}>
          All
        </Button>
        <Button onClick={onActiveClickHandler} variant={'success'}>
          Active
        </Button>
        <Button onClick={onCompletedClickHandler} variant={'success'}>
          Completed
        </Button>
      </div>
    </Card>
  )
}
