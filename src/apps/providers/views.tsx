import React from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { ProviderListProps, ProviderListState, ProviderAddFormProps, ProviderAddFormState, ProvidersProps, ProvidersState } from './interfaces'
import { ProviderAdd } from './models'
import './style.css'

class ProviderList extends React.Component<ProviderListProps, ProviderListState> {
  constructor(props: ProviderListProps, state: ProviderListState) {
    super(props)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <List component="nav">
        {this.props.providers.map((provider) => {
          const label = `${provider.label} (${provider.city})`
          return <ListItem button key={provider.id}>
            <ListItemText primary={label} />
          </ListItem>
        })}
      </List>
    )
  }
}

class ProviderAddForm extends React.Component<ProviderAddFormProps, ProviderAddFormState> {
  constructor(props: ProviderAddFormProps, state: ProviderAddFormState) {
    super(props)
    this.state = {
      provider: { label: "", address: "", city: "", zipcode: "", phone: "" }
    }
    this.change = this.change.bind(this)
    this.add = this.add.bind(this)
    this.close = this.close.bind(this)
  }

  change(event: any): void {
    switch (event.target.name) {
      case 'label':
        this.setState({
          provider: {
            label: event.target.value,
            address: this.state.provider.address,
            city: this.state.provider.city,
            zipcode: this.state.provider.zipcode,
            phone: this.state.provider.phone
          }
        })
        break
      case 'address':
        this.setState({
          provider: {
            label: this.state.provider.label,
            address: event.target.value,
            city: this.state.provider.city,
            zipcode: this.state.provider.zipcode,
            phone: this.state.provider.phone
          }
        })
        break
      case 'city':
        this.setState({
          provider: {
            label: this.state.provider.label,
            address: this.state.provider.address,
            city: event.target.value,
            zipcode: this.state.provider.zipcode,
            phone: this.state.provider.phone
          }
        })
        break
      case 'zipcode':
        this.setState({
          provider: {
            label: this.state.provider.label,
            address: this.state.provider.address,
            city: this.state.provider.city,
            zipcode: event.target.value,
            phone: this.state.provider.phone
          }
        })
        break
      case 'phone':
        this.setState({
          provider: {
            label: this.state.provider.label,
            address: this.state.provider.address,
            city: this.state.provider.city,
            zipcode: this.state.provider.zipcode,
            phone: event.target.value
          }
        })
        break
      default:
    }
  }

  add(): void {
    this.props.onAdd(this.state.provider)
  }

  close(): void {
    this.props.onCancel()
  }

  render(): JSX.Element {
    return (
      <Dialog open={this.props.open} onClose={this.close}>
        <DialogTitle>Add a provider</DialogTitle>
        <DialogContent>
          <TextField className="textfield" label="label" name="label" onChange={this.change} fullWidth />
          <TextField className="textfield" label="phone" name="phone" onChange={this.change} fullWidth />
          <TextField className="textfield" label="address" name="address" onChange={this.change} fullWidth />
          <TextField className="textfield" label="zipcode" name="zipcode" onChange={this.change} fullWidth />
          <TextField className="textfield" label="city" name="city" onChange={this.change} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.add} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default class Providers extends React.Component<ProvidersProps, ProvidersState> {
  constructor(props: ProvidersProps, state: ProvidersState) {
    super(props)
    this.state = {
      open: false
    }
    this.onAdd = this.onAdd.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.showAddForm = this.showAddForm.bind(this)
  }

  onAdd(provider: ProviderAdd): void {
    this.props.onAdd(provider)
    this.setState({ open: false })
  }

  onCancel(): void {
    this.setState({ open: false })
  }

  showAddForm(): void {
    this.setState({ open: true })
  }

  render(): JSX.Element {
    return (
      <>
        <Paper elevation={3}>
          <Button type="button" color="primary" onClick={this.showAddForm} fullWidth>Add</Button>
          <Divider />
          <ProviderList providers={this.props.providers} />
        </Paper>
        <ProviderAddForm open={this.state.open} onAdd={this.onAdd} onCancel={this.onCancel} />
      </>
    )
  }
}