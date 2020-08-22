import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

export default function CategoryDialog(props) {
  const { onClose, open } = props
  const [label, setLabel] = useState('')
  const [labelErrorMessage, setLabelErrorMessage] = useState('')

  const onChange = (event) => {
    if (event.target.name === 'label') {
      setLabel(event.target.value)
      setLabelErrorMessage('')
    }
  }

  const close = () => {
    if (label === '') {
      setLabelErrorMessage('The label cannot be empty.')
    }

    if (label !== '') {
      onClose({ label: label })
    }
  }

  useEffect(() => {
    if (!open) {
      setLabel('')
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick>
        <DialogTitle>Add a category</DialogTitle>
        <DialogContent>
        <FormControl fullWidth>
          <InputLabel htmlFor="label" required>Label</InputLabel>
          <Input id="label" name="label" value={label} onChange={onChange} onKeyDown={onChange} error={labelErrorMessage !== ''} aria-describedby="label-error" />
          <FormHelperText id="label-error">{labelErrorMessage}</FormHelperText>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(undefined)} color="secondary">Cancel</Button>
          <Button onClick={close} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
  )
}