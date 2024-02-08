import React, { ChangeEvent, useState } from 'react'

import { Button, Card, Input, Typography } from '@/components'
import { TASKS } from '@/db'
import { Task, TaskType } from '@/widgets/ui/task/task'

import s from './taskList.module.scss'

type PropsTaskListType = {
  title: string
}

export const TaskList = (props: PropsTaskListType) => {
  const { title } = props
  const [tasksList, setTasksList] = useState<TaskType[]>(TASKS)
  const [inputValue, setInputValue] = useState<string>('')
  const addTask = (e: React.FormEvent<HTMLFormElement>, task: string) => {
    e.preventDefault()
    const newTask = {
      addedDate: '2019-07-30T12:23:49.677',
      id: 'a2dfe62b-ebce-4b37-9581-1cc77ebc995f',
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

  const onInputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('tap')
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
          type={'text'}
          value={inputValue}
        />
        <Button variant={'info'}>+</Button>
      </form>
      <div>
        {tasksList.map(t => (
          <Task key={t.id} title={t.title} />
        ))}
      </div>
    </Card>
  )
}
