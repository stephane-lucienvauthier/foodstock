import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Select from '@material-ui/core/Select'


export default function BatchDialog(props) {
  const { unit, providers, onClose, open } = props
  const [initial, setInitial] = useState('')
  const [initialErrorMessage, setInitialErrorMessage] = useState('')
  const [current, setCurrent] = useState('')
  const [currentErrorMessage, setCurrentErrorMessage] = useState('')
  const [price, setPrice] = useState('')
  const [priceErrorMessage, setPriceErrorMessage] = useState('')
  const [purchase, setPurchase] = useState(new Date(Date.now()))
  const [purchaseErrorMessage, setPurchaseErrorMessage] = useState('')
  const [limit, setLimit] = useState(new Date(Date.now()))
  const [limitErrorMessage, setLimitErrorMessage] = useState('')
  const [provider, setProvider] = useState('')
  const [providerErrorMessage, setProviderErrorMessage] = useState('')

  const onChange = (event) => {
    switch (event.target.name) {
      case 'initial':
        setInitial(event.target.value)
        setInitialErrorMessage('')
        break
      case 'current':
        setCurrent(event.target.value)
        setCurrentErrorMessage('')
        break
      case 'price':
        setPrice(event.target.value)
        setPriceErrorMessage('')
        break
      case 'provider':
        setProvider(event.target.value)
        setProviderErrorMessage('')
        break
      default:
    }
  }

  const onChangePurchase = (purchase) => {
    setPurchase(purchase)
    setPurchaseErrorMessage('')
  }

  const onChangeLimit = (limit) => {
    setLimit(limit)
    setLimitErrorMessage('')
  }

  const close = () => {
    if (initial === '' || initial <= 0) {
      setInitialErrorMessage('The initial value must greater than zero.')
    }

    if (current === '') {
      setCurrentErrorMessage('The current value cannot be empty.')
    }

    if (price === '' || price <= 0) {
      setPriceErrorMessage('The price value must greater than zero.')
    }

    if (purchase === '') {
      setPurchaseErrorMessage('The purchase date cannot be empty.')
    }

    if (limit === '') {
      setLimitErrorMessage('The limit date cannot be empty.')
    }

    if (provider === '') {
      setProviderErrorMessage('The provider must greater than zero.')
    }

    if (initial !== '' && initial > 0 && current !== '' && price !== '' && price > 0 && purchase !== '' && limit !== '' && provider !== '') {
      onClose({ initial: initial, current: current, price: price, purchase: purchase, limit: limit, provider: provider })
    }
  }

  useEffect(() => {
    if (!open) {
      setInitial('')
      setCurrent('')
      setPrice('')
      setPurchase(new Date(Date.now()))
      setLimit(new Date(Date.now()))
      setProvider('')
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick>
      <DialogTitle>Add a batch</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel htmlFor="initial" required>Initial</InputLabel>
          <Input id="initial" name="initial" value={initial} onChange={onChange} onKeyDown={onChange} error={initialErrorMessage !== ''} aria-describedby="initial-error" endAdornment={<InputAdornment position="end">{unit}</InputAdornment>} />
          <FormHelperText id="initial-error">{initialErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="current" required>Current</InputLabel>
          <Input id="current" name="current" value={current} onChange={onChange} onKeyDown={onChange} error={currentErrorMessage !== ''} aria-describedby="current-error" endAdornment={<InputAdornment position="end">{unit}</InputAdornment>} />
          <FormHelperText id="current-error">{currentErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="price" required>Price</InputLabel>
          <Input id="price" name="price" value={price} onChange={onChange} onKeyDown={onChange} error={priceErrorMessage !== ''} aria-describedby="price-error" endAdornment={<InputAdornment position="end">€</InputAdornment>} />
          <FormHelperText id="price-error">{priceErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar name="purchase" variant="inline" format="yyyy-MM-dd" margin="normal" id="purchase-picker" label="Purchase" value={purchase} onChange={onChangePurchase} error={purchaseErrorMessage !== ''} aria-describedby="purchase-error" />
          </MuiPickersUtilsProvider>
          <FormHelperText id="purchase-error">{purchaseErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar name="limit" variant="inline" format="yyyy-MM-dd" margin="normal" id="limit-picker" label="Limit" value={limit} onChange={onChangeLimit} error={limitErrorMessage !== ''} aria-describedby="limit-error" />
          </MuiPickersUtilsProvider>
          <FormHelperText id="limit-error">{limitErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={providerErrorMessage !== ''}>
          <InputLabel id="provider-label" required>Provider</InputLabel>
          <Select labelId="provider-label" name="provider" id="provider" value={provider} onChange={onChange}>
            <MenuItem value=""><em>None</em></MenuItem>
            {providers.map((provider) => (
              <MenuItem key={provider.id} value={provider.id}>{provider.label}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{providerErrorMessage}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(undefined)} color="secondary">Cancel</Button>
        <Button onClick={close} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
}