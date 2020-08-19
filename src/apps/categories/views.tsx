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
import { CategorySave, Category } from './models'

class RemoveForm extends React.Component<RemoveProps> implements RemoveInterface {
  constructor(props: RemoveProps) {
    super(props)
    this.onRemove = this.onRemove.bind(this)
    this.onCancelRemove = this.onCancelRemove.bind(this)
  }

  onRemove(): void {
    this.props.onRemove()
  }

  onCancelRemove(): void {
    this.props.onCancelRemove()
  }

  render(): JSX.Element {
    return (
      <Dialog open={this.props.open} onClose={this.onCancelRemove}>
        <DialogTitle>Delete a category</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancelRemove} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.onRemove} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class SaveForm extends React.Component<SaveProps, SaveState> implements SaveInterface<CategorySave> {
  constructor(props: SaveProps, state: SaveState) {
    super(props)
    this.state = {
      obj: undefined
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancelSave = this.onCancelSave.bind(this)
  }

  componentDidUpdate(props: any): void {
    if (props.obj !== this.props.obj) {
      this.setState({obj: this.props.obj})
    }
  }

  onChange(event: any): void {
    this.setState({obj: {label: event.target.value}})
  }

  onSave(obj?: CategorySave): void {
    if (obj !== undefined) {
      this.props.onSave(obj)
    }
    this.setState({obj: {label: ""}})
  }

  onCancelSave(): void {
    this.props.onCancelSave()
    this.setState({obj: {label: ""}})
  }

  render(): JSX.Element {
    const action = this.props.isUpdate ? 'Update' : 'Add'
    return (
      <Dialog open={this.props.open} onClose={this.onCancelSave}>
        <DialogTitle>{action} a category</DialogTitle>
        <DialogContent>
          <TextField className="textfield" label="label" name="label" value={this.state.obj?.label} onChange={this.onChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancelSave} color="secondary">Cancel</Button>
          <Button onClick={() => this.onSave(this.state.obj)} color="primary">{action}</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class ListForm extends React.Component<ListProps> implements ShowDialogInterface<Category> {
  constructor(props: ListProps) {
    super(props)
    this.onShowSaveForm = this.onShowSaveForm.bind(this)
    this.onShowRemoveForm = this.onShowRemoveForm.bind(this)
  }

  onShowSaveForm(obj?: Category | undefined): void {
    this.props.onShowSaveForm(obj)
  }

  onShowRemoveForm(obj: Category): void {
    this.props.onShowRemoveForm(obj)
  }

  render(): JSX.Element {
    return (
      <List component="nav">
        {this.props.list.map((category) => {
          return <ListItem button key={category.id}>
            <ListItemText primary={category.label} />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={() => this.onShowSaveForm(category)} color="primary"><Icon>edit</Icon></IconButton>
              <IconButton size="small" onClick={() => this.onShowRemoveForm(category)} color="secondary"><Icon>delete</Icon></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        })}
      </List>
    )
  }
}

export default class Categories extends React.Component<MainProps, MainState> implements SaveInterface<CategorySave>, RemoveInterface, ShowDialogInterface<Category> {
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
  onSave(obj: CategorySave): void {
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
    if (this.state.current !== undefined) {
      this.props.onRemove(this.state.current.id)
    }
    this.setState({
      current: undefined,
      showRemoveForm: false
    })
  }

  onCancelRemove(): void {
    this.setState({
      current: undefined,
      showRemoveForm: false
    })
  }

  async onShowSaveForm(obj?: Category | undefined): Promise<void> {
    this.setState({
      current: obj,
      showSaveForm: true,
      isUpdate: obj !== undefined
    })
  }

  async onShowRemoveForm(obj: Category): Promise<void> {
    this.setState({
      current: obj,
      showRemoveForm: true,
      isUpdate: obj !== undefined
    })
  }

  render(): JSX.Element {
    return (
      <>
        <Paper className="CategoriesPaper" elevation={3}>
          <Button type="button" color="primary" onClick={() => { this.onShowSaveForm(undefined) }} fullWidth>Add a category</Button>
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