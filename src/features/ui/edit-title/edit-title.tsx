import { ChangeEvent, memo, useCallback, useState } from 'react'

import { Input, TextVariantType, Typography } from '@/shared'
import { Tooltip } from '@mui/material'

type EditTitlePropsType = {
  callback?: (id: string, newTitle: string) => void
  itemId: string
  itemTitle: string
  label: string
  textVariant: TextVariantType
}
export const EditTitle = memo((props: EditTitlePropsType) => {
  const { callback, itemId, itemTitle, label, textVariant } = props
  const [inputValue, setInputValue] = useState<string>(itemTitle)
  const [editMode, setEditMode] = useState<boolean>(false)

  const onEditModeHandler = () => setEditMode(true)
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }, [])

  const onViewMode = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newTitle = e.currentTarget.value

      if (callback) {
        callback(newTitle, itemId)
      }
      setEditMode(false)
    },
    [callback, itemId]
  )

  return (
    <Tooltip placement={'top-start'} title={'double-click to edit'}>
      <div>
        {!editMode ? (
          <Typography
            onDoubleClick={onEditModeHandler}
            style={{ userSelect: 'none' }}
            variant={textVariant}
          >
            {itemTitle}
          </Typography>
        ) : (
          <Input
            autoFocus
            id={'standard-basic'}
            label={label}
            onBlur={onViewMode}
            onChange={onChangeHandler}
            type={'text'}
            value={inputValue}
            variant={'standard'}
          />
        )}
      </div>
    </Tooltip>
  )
})
