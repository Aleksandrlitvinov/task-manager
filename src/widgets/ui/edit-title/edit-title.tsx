import { ChangeEvent, useState } from 'react'

import { TextVariantType, Typography } from '@/components'

import s from './edit-title.module.scss'

type EditTitlePropsType = {
  editMode: boolean
  onEditMode?: () => void
  onViewMode: (e: ChangeEvent<HTMLInputElement>) => void
  taskTitle: string
  textVariant: TextVariantType
}
export const EditTitle = (props: EditTitlePropsType) => {
  const { editMode, onEditMode, onViewMode, taskTitle, textVariant } = props
  const [inputValue, setInputValue] = useState<string>(taskTitle)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <>
      {!editMode ? (
        <Typography onDoubleClick={onEditMode} variant={textVariant}>
          {taskTitle}
        </Typography>
      ) : (
        <input
          autoFocus
          className={s.input}
          onBlur={onViewMode}
          onChange={onChangeHandler}
          type={'text'}
          value={inputValue}
        />
      )}
    </>
  )
}
