import React from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { CategoriesProps, CategoriesState, CategoryAddFormProps, CategoryAddFormState, CategoryListProps, CategoryListState } from './interfaces'
import { CategoryAdd } from './models'
import './style.css';

class CategoryList extends React.Component<CategoryListProps, CategoryListState> {
  constructor(props: CategoryListProps, state: CategoryListState) {
      super(props)
      this.state = {}
  }

  render(): JSX.Element {
      return (
          <List component="nav">
              {this.props.categories.map((category) => {
                  return <ListItem button>
                      <ListItemText primary={category.label} />
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
  }

  change(event: any): void {
    this.setState({ category: { label: event.target.value } })
  }

  add(): void {
    this.props.onAdd(this.state.category)
  }

  render(): JSX.Element {
    return (
      <form>
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <TextField className="textfield" label="label" name="label" onChange={this.change} />
          </Grid>
          <Grid item xs={1}>
            <Button type="button" variant="contained" color="primary" onClick={this.add}>Add</Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default class Categories extends React.Component<CategoriesProps, CategoriesState> {
  constructor(props: CategoriesProps, state: CategoriesState) {
    super(props)
    this.state = {}
    this.onAdd = this.onAdd.bind(this)
  }

  onAdd(category: CategoryAdd): void {
    this.props.onAdd(category)
  }

  render(): JSX.Element {
    return (
        <div className="categoryView">
          <CategoryAddForm onAdd={this.onAdd} />
          <CategoryList categories={this.props.categories} />
        </div>
    )
  }
}