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

export const TaskList = (props: PropsTaskListType) => {
  const { title } = props
  const [tasksList, setTasksList] = useState<TaskTypeDTO[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const addTask = (e: React.FormEvent<HTMLFormElement>, task: string) => {
    e.preventDefault()
    const newTask = {
      addedDate: '2019-07-30T12:23:49.677',
      id: uuidv4(),
      isCompleted: false,
      order: 3,
      title: task,
    }

    if (task === '') {
      alert('enter title')
    } else {
      setTasksList([...tasksList, newTask])
    }

    setInputValue('')
  }

  const removeTask = (id: string) => {
    setTasksList(tasksList.filter(t => t.id !== id))
  }

  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

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
          onChange={onInputChangeValue}
          onValueChange={inputValue => setInputValue(inputValue)}
          placeholder={'Enter task title'}
          type={'text'}
          value={inputValue}
        />
        <Button variant={'info'}>+</Button>
      </form>
      <div>
        {tasksList.map(t => (
          <Task
            id={t.id}
            isCompleted={t.isCompleted}
            key={t.id}
            removeTask={removeTask}
            title={t.title}
          />
        ))}
      </div>
    </Card>
  )
}
