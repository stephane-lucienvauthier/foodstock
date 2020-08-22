import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'


export default function CategoryDialog(props) {
  const { onClose, open } = props;
  const [label, setLabel] = useState('');

  const onChange = (event) => {
    if (event.target.name === 'label') {
      setLabel(event.target.value)
    }
  }

  useEffect(() => {
    if (!open) {
      setLabel('')
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add a category</DialogTitle>
        <DialogContent>
          <TextField className="textfield" label="label" name="label" value={label} onChange={onChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(undefined)} color="secondary">Cancel</Button>
          <Button onClick={() => onClose( { label: label })} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
  )
}