import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function ProviderDelete(props) {
  const { onClose, open } = props

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete a provider</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="secondary">
          Cancel
          </Button>
        <Button onClick={() => onClose(true)} color="primary">
          Remove
          </Button>
      </DialogActions>
    </Dialog>
  )
}