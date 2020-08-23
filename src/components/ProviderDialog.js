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


export default function ProviderDialog(props) {
  const { onClose, open, provider } = props
  const [label, setLabel] = useState(provider !== undefined ? provider.label : '')
  const [labelErrorMessage, setLabelErrorMessage] = useState('')
  const [phone, setPhone] = useState(provider !== undefined ? provider.phone : '')
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
  const [address, setAddress] = useState(provider !== undefined ? provider.address : '')
  const [addressErrorMessage, setAddressErrorMessage] = useState('')
  const [zipcode, setZipcode] = useState(provider !== undefined ? provider.zipcode : '')
  const [zipcodeErrorMessage, setZipcodeErrorMessage] = useState('')
  const [city, setCity] = useState(provider !== undefined ? provider.city : '')
  const [cityErrorMessage, setCityErrorMessage] = useState('')

  const onChange = (event) => {
    switch (event.target.name) {
      case 'label':
        setLabel(event.target.value)
        setLabelErrorMessage('')
        break
      case 'phone':
        setPhone(event.target.value)
        setPhoneErrorMessage('')
        break
      case 'address':
        setAddress(event.target.value)
        setAddressErrorMessage('')
        break
      case 'zipcode':
        setZipcode(event.target.value)
        setZipcodeErrorMessage('')
        break
      case 'city':
        setCity(event.target.value)
        setCityErrorMessage('')
        break
      default:
    }
  }

  const close = () => {
    if (label === '') {
      setLabelErrorMessage('The label cannot be empty.')
    }

    if (phone === '') {
      setPhoneErrorMessage('The phone cannot be empty.')
    }

    if (address === '') {
      setAddressErrorMessage('The address cannot be empty.')
    }

    if (zipcode === '') {
      setZipcodeErrorMessage('The zipcode cannot be empty.')
    }

    if (city === '') {
      setCityErrorMessage('The city cannot be empty.')
    }

    if (label !== '' && phone !== '' && address !== '' && zipcode !== '' && city !== '') {
      onClose({ label: label, phone: phone, address: address, zipcode: zipcode, city: city })
    }
  }

  useEffect(() => {
    setLabel(provider !== undefined ? provider.label : '')
    setPhone(provider !== undefined ? provider.phone : '')
    setAddress(provider !== undefined ? provider.address : '')
    setZipcode(provider !== undefined ? provider.zipcode : '')
    setCity(provider !== undefined ? provider.city : '')
  }, [provider]);

  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick>
      <DialogTitle>Add a provider</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel htmlFor="label" required>Label</InputLabel>
          <Input id="label" name="label" value={label} onChange={onChange} onKeyDown={onChange} error={labelErrorMessage !== ''} aria-describedby="label-error" />
          <FormHelperText id="label-error">{labelErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="phone" required>Phone</InputLabel>
          <Input id="phone" name="phone" value={phone} onChange={onChange} onKeyDown={onChange} error={phoneErrorMessage !== ''} aria-describedby="phone-error" />
          <FormHelperText id="phone-error">{phoneErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="address" required>Address</InputLabel>
          <Input id="address" name="address" value={address} onChange={onChange} onKeyDown={onChange} error={addressErrorMessage !== ''} aria-describedby="address-error" />
          <FormHelperText id="address-error">{addressErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="zipcode" required>Zipcode</InputLabel>
          <Input id="zipcode" name="zipcode" value={zipcode} onChange={onChange} onKeyDown={onChange} error={zipcodeErrorMessage !== ''} aria-describedby="zipcode-error" />
          <FormHelperText id="zipcode-error">{zipcodeErrorMessage}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="city" required>City</InputLabel>
          <Input id="city" name="city" value={city} onChange={onChange} onKeyDown={onChange} error={cityErrorMessage !== ''} aria-describedby="city-error" />
          <FormHelperText id="city-error">{cityErrorMessage}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(undefined)} color="secondary">Cancel</Button>
        <Button onClick={close} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
}