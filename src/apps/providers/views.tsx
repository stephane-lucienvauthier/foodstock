import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { SaveInterface, RemoveInterface, ShowDialogInterface } from '../core/interfaces'
import { MainProps, MainState, ListProps, SaveProps, SaveState, RemoveProps } from './interfaces'
import { ProviderSave, Provider } from './models'

class RemoveForm extends React.Component<RemoveProps> implements RemoveInterface {
  constructor(props: RemoveProps) {
    super(props)
    this.onRemove = this.onRemove.bind(this)
    this.onCancelRemove = this.onCancelRemove.bind(this)
  }

  onRemove(): void {
    throw new Error("Method not implemented.")
  }

  onCancelRemove(): void {
    throw new Error("Method not implemented.")
  }

  render(): JSX.Element {
    return (<h1>Method not implemented.</h1>)
  }
}

class SaveForm extends React.Component<SaveProps, SaveState> implements SaveInterface<ProviderSave> {
  constructor(props: SaveProps, state: SaveState) {
    super(props)
    this.state = {
      obj: undefined
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancelSave = this.onCancelSave.bind(this)
  }

  onChange(event: any): void {
    let label, phone, address, zipcode, city
      if (this.state.obj !== undefined) {
        label = this.state.obj.label
        phone = this.state.obj.phone
        address = this.state.obj.address
        zipcode = this.state.obj.zipcode
        city = this.state.obj.city
      } else {
        label = ''
        phone = ''
        address = ''
        zipcode = ''
        city = ''
      }
  
      switch (event.target.name) {
        case 'label':
          label = event.target.value
          break
        case 'phone':
          phone = event.target.value
          break
        case 'address':
          address = event.target.value
          break
        case 'zipcode':
          zipcode = event.target.value
          break
        case 'city':
          city = event.target.value
          break
        default:
      }
  
      this.setState({obj: {
        label: label,
        phone: phone,
        address: address,
        zipcode: zipcode,
        city: city
      }})
  }

  onSave(obj?: ProviderSave): void {
    if (obj !== undefined) {
      this.props.onSave(obj)
    }
    this.setState({obj: {
      label: "",
      phone: "",
      address: "",
      zipcode: "",
      city: ""
    }})
  }

  onCancelSave(): void {
    this.props.onCancelSave()
    this.setState({obj: {
      label: "",
      phone: "",
      address: "",
      zipcode: "",
      city: ""
    }})
  }

  render(): JSX.Element {
    const action = this.props.isUpdate ? 'Update' : 'Add'
    return (
      <Dialog open={this.props.open} onClose={this.onCancelSave}>
        <DialogTitle>{action} a provider</DialogTitle>
        <DialogContent>
          <TextField className="textfield" label="label" name="label" value={this.state.obj?.label} onChange={this.onChange} fullWidth />
          <TextField className="textfield" label="phone" name="phone" value={this.state.obj?.phone} onChange={this.onChange} fullWidth />
          <TextField className="textfield" label="address" name="address" value={this.state.obj?.address} onChange={this.onChange} fullWidth />
          <TextField className="textfield" label="zipcode" name="zipcode" value={this.state.obj?.zipcode} onChange={this.onChange} fullWidth />
          <TextField className="textfield" label="city" name="city" value={this.state.obj?.city} onChange={this.onChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancelSave} color="secondary">Cancel</Button>
          <Button onClick={() => this.onSave(this.state.obj)} color="primary">{action}</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class ListForm extends React.Component<ListProps> implements ShowDialogInterface<Provider> {
  constructor(props: ListProps) {
    super(props)
    this.onShowSaveForm = this.onShowSaveForm.bind(this)
    this.onShowRemoveForm = this.onShowRemoveForm.bind(this)
  }

  onShowSaveForm(obj?: Provider | undefined): void {
    this.props.onShowSaveForm(obj)
  }

  onShowRemoveForm(obj: Provider): void {
    throw new Error("Method not implemented.")
  }

  render(): JSX.Element {
    return (
      <List component="nav">
        {this.props.list.map((provider) => {
          return <ListItem button key={provider.id}>
            <ListItemText primary={`${provider.label} (${provider.city})`} />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={() => this.onShowSaveForm(provider)} color="primary"><Icon>edit</Icon></IconButton>
              <IconButton size="small" onClick={() => this.onShowRemoveForm(provider)} color="secondary"><Icon>delete</Icon></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        })}
      </List>
    )
  }
}

export default class Providers extends React.Component<MainProps, MainState> implements SaveInterface<ProviderSave>, RemoveInterface, ShowDialogInterface<Provider> {
  constructor(props: MainProps, state: MainState) {
    super(props)
    this.state = {
      current: undefined,
      isUpdate: false,
      showSaveForm: false,
      showRemoveForm: false
    }
    this.onSave = this.onSave.bind(this)
    this.onCancelSave = this.onCancelSave.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onCancelRemove = this.onCancelRemove.bind(this)
    this.onShowSaveForm = this.onShowSaveForm.bind(this)
    this.onShowRemoveForm = this.onShowRemoveForm.bind(this)
  }

  onSave(obj: ProviderSave): void {
    if (this.state.current !== undefined) {
      this.props.onSave(this.state.current.id, obj)
    } else {
      this.props.onSave(0, obj)
    }
    this.setState({
      current: undefined,
      showSaveForm: false
    })
  }

  onCancelSave(): void {
    this.setState({
      current: undefined,
      showSaveForm: false
    })
  }

  onRemove(): void {
    throw new Error("Method not implemented.")
  }

  onCancelRemove(): void {
    throw new Error("Method not implemented.")
  }

  async onShowSaveForm(obj?: Provider | undefined): Promise<void> {
    this.setState({
      current: obj,
      showSaveForm: true,
      isUpdate: obj !== undefined
    })
  }

  onShowRemoveForm(obj: Provider): Promise<void> {
    throw new Error("Method not implemented.")
  }

  render(): JSX.Element {
    return (
      <>
        <Paper elevation={3}>
          <Button type="button" color="primary" onClick={() => { this.onShowSaveForm(undefined) }} fullWidth>Add a provider</Button>
          <Divider />
          <ListForm list={this.props.list} onShowSaveForm={this.onShowSaveForm} onShowRemoveForm={this.onShowRemoveForm} />
        </Paper>
        <SaveForm open={this.state.showSaveForm} obj={this.state.current} isUpdate={this.state.isUpdate} onSave={this.onSave} onCancelSave={this.onCancelSave} />
        {
          this.state.current && (
            <>
              <RemoveForm open={this.state.showRemoveForm} onRemove={this.onRemove} onCancelRemove={this.onCancelRemove} />
            </>
          )
        }
      </>
    )
  }
}