import { ChangeEvent, useState } from 'react'

import { TextVariantType, Typography } from '@/components'
import { TextField } from '@mui/material'

type EditTitlePropsType = {
  editMode: boolean
  label: string
  onEditMode?: () => void
  onViewMode: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  taskTitle: string
  textVariant: TextVariantType
}
export const EditTitle = (props: EditTitlePropsType) => {
  const { editMode, label, onEditMode, onViewMode, taskTitle, textVariant } = props
  const [inputValue, setInputValue] = useState<string>(taskTitle)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <>
      {!editMode ? (
        <Typography onDoubleClick={onEditMode} style={{ userSelect: 'none' }} variant={textVariant}>
          {taskTitle}
        </Typography>
      ) : (
        <TextField
          autoFocus
          id={'standard-basic'}
          label={label}
          onBlur={onViewMode}
          onChange={onChangeHandler}
          value={inputValue}
          variant={'standard'}
        />
      )}
    </>
  )
}
