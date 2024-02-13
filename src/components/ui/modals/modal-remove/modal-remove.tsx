import { useDispatch } from 'react-redux'

import { removeTaskAC } from '@/redux/slices/tasks-slice/TasksSlice'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

type ModalPropsType = {
  handleClose: () => void
  id: string
  open: boolean
  title: string
}
export const ModalRemove = (props: ModalPropsType) => {
  const { handleClose, id, open, title } = props
  const dispatch = useDispatch()
  const removeTask = (id: string) => {
    dispatch(removeTaskAC(id))
  }

  return (
    <Dialog
      aria-describedby={'alert-dialog-description'}
      aria-labelledby={'alert-dialog-title'}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id={'alert-dialog-title'}>
        Do you really want to remove this {title} list ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button autoFocus onClick={() => removeTask(id)}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
