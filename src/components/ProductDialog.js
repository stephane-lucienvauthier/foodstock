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
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'


export default function ProductDialog(props) {
  const { categories, onClose, open } = props
  const [label, setLabel] = useState('')
  const [labelErrorMessage, setLabelErrorMessage] = useState('')
  const [unit, setUnit] = useState('')
  const [unitErrorMessage, setUnitErrorMessage] = useState('')
  const [category, setCategory] = useState('')
  const [categoryErrorMessage, setCategoryErrorMessage] = useState('')

  const onChange = (event) => {
    switch (event.target.name) {
      case 'label':
        setLabel(event.target.value)
        setLabelErrorMessage('')
        break
      case 'unit':
        setUnit(event.target.value)
        setUnitErrorMessage('')
        break
      case 'category':
        setCategory(event.target.value)
        setCategoryErrorMessage('')
        break
      default:
    }
  }

  const close = () => {
    if (label === '') {
      setLabelErrorMessage('The label cannot be empty.')
    }

    if (unit === '') {
      setUnitErrorMessage('The unit cannot be empty.')
    }

    if (category === '') {
      setCategoryErrorMessage('The category cannot be empty.')
    }

    if (label !== '' && unit !== '' && category !== '') {
      onClose({ label: label, unit: unit, category: category })
    }
  }

  useEffect(() => {
    if (!open) {
      setLabel('')
      setUnit('')
      setCategory('')
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick>
      <DialogTitle>Add a product</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel htmlFor="label" required>Label</InputLabel>
          <Input id="label" name="label" value={label} onChange={onChange} onKeyDown={onChange} error={labelErrorMessage !== ''} aria-describedby="label-error" />
          <FormHelperText id="label-error">{labelErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={unitErrorMessage !== ''}>
          <InputLabel id="unit-label" required>Unit</InputLabel>
          <Select labelId="unit-label" name="unit" id="unit" value={unit} onChange={onChange}>
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Kg">Kg</MenuItem>
            <MenuItem value="L">Litre</MenuItem>
            <MenuItem value="Unité">Unité</MenuItem>
          </Select>
          <FormHelperText>{unitErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={categoryErrorMessage !== ''}>
          <InputLabel id="category-label" required>Category</InputLabel>
          <Select labelId="category-label" name="category" id="category" value={category} onChange={onChange}>
            <MenuItem value=""><em>None</em></MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
            ))}
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>{categoryErrorMessage}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(undefined)} color="secondary">Cancel</Button>
        <Button onClick={close} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
}