import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { CategoriesProps, CategoriesState, CategoryAddFormProps, CategoryAddFormState, CategoryListProps, CategoryListState, CategoryUpdateFormProps, CategoryUpdateFormState } from './interfaces'
import { Category, CategoryAdd } from './models'
import './style.css';

class CategoryUpdateForm extends React.Component<CategoryUpdateFormProps, CategoryUpdateFormState> {
  constructor(props: CategoryUpdateFormProps, state: CategoryUpdateFormState) {
    super(props)
    this.state = {
      category: { label: this.props.category.label }
    }
    this.change = this.change.bind(this)
    this.update = this.update.bind(this)
    this.close = this.close.bind(this)
  }

  change(event: any): void {
    this.setState({ category: { label: event.target.value } })
  }

  update(): void {
    this.props.onUpdate(this.state.category)
  }

  close(): void {
    this.props.onCancel()
  }

  render(): JSX.Element {
    return (
      <Dialog open={this.props.open} onClose={this.close}>
        <DialogTitle>Update a category</DialogTitle>
        <DialogContent>
          <TextField className="textfield" label="label" name="label" value={this.state.category.label} onChange={this.change} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.update} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class CategoryList extends React.Component<CategoryListProps, CategoryListState> {
  constructor(props: CategoryListProps, state: CategoryListState) {
    super(props)
    this.state = {}
    this.edit = this.edit.bind(this)
  }

  edit(category: Category): void {
    this.props.showUpdateForm(category)
  }

  render(): JSX.Element {
    return (
      <List component="nav">
        {this.props.categories.map((category) => {
          return <ListItem button key={category.id}>
            <ListItemText primary={category.label} />
            <ListItemSecondaryAction><IconButton size="small" onClick={() => this.edit(category)} color="primary"><Icon>edit</Icon></IconButton></ListItemSecondaryAction>
          </ListItem>
        })}
      </List>
    )
  }
}

class CategoryAddForm extends React.Component<CategoryAddFormProps, CategoryAddFormState> {
  constructor(props: CategoryAddFormProps, state: CategoryAddFormState) {
    super(props)
    this.state = {
      category: { label: "" }
    }
    this.change = this.change.bind(this)
    this.add = this.add.bind(this)
    this.close = this.close.bind(this)
  }

  change(event: any): void {
    this.setState({ category: { label: event.target.value } })
  }

  add(): void {
    this.props.onAdd(this.state.category)
  }

  close(): void {
    this.props.onCancel()
  }

  render(): JSX.Element {
    return (
      <Dialog open={this.props.open} onClose={this.close}>
        <DialogTitle>Add a category</DialogTitle>
        <DialogContent>
          <TextField className="textfield" label="label" name="label" onChange={this.change} fullWidth />
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

export default class Categories extends React.Component<CategoriesProps, CategoriesState> {
  constructor(props: CategoriesProps, state: CategoriesState) {
    super(props)
    this.state = {
      open: false,
      openUpdateForm: false
    }
    this.onAdd = this.onAdd.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCancelUpdate = this.onCancelUpdate.bind(this)
    this.showAddForm = this.showAddForm.bind(this)
    this.showUpdateForm = this.showUpdateForm.bind(this)
  }

  onAdd(category: CategoryAdd): void {
    this.props.onAdd(category)
    this.setState({ open: false })
  }

  onUpdate(category: CategoryAdd): void {
    if (this.state.current) {
      this.props.onUpdate(this.state.current.id, category)
    }
    this.setState({ openUpdateForm: false })
  }

  onCancel(): void {
    this.setState({ open: false })
  }

  onCancelUpdate(): void {
    this.setState({ openUpdateForm: false })
  }

  showAddForm(): void {
    this.setState({ open: true })
  }

  showUpdateForm(category: Category): void {
    this.setState({ current: category })
    this.setState({ openUpdateForm: true })
  }

  render(): JSX.Element {
    return (
      <>
        <Paper className="CategoriesPaper" elevation={3}>
          <Button type="button" color="primary" onClick={this.showAddForm} fullWidth>Add</Button>
          <Divider />
          <CategoryList categories={this.props.categories} showUpdateForm={this.showUpdateForm} />
        </Paper>
        <CategoryAddForm open={this.state.open} onAdd={this.onAdd} onCancel={this.onCancel} />
        {
          this.state.current && (
            <>
              <CategoryUpdateForm category={this.state.current} open={this.state.openUpdateForm} onUpdate={this.onUpdate} onCancel={this.onCancelUpdate} />
            </>
          )
        }
      </>
    )
  }
}