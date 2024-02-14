import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

type ModalPropsType = {
  handleClose: () => void
  id: string
  open: boolean
  removeItem: (id: string) => void
  title: string
}
export const ModalRemove = (props: ModalPropsType) => {
  const { handleClose, id, open, removeItem, title } = props
  const removeTask = (id: string) => {
    removeItem(id)
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
