import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Category, CategoryAdd } from './models'
import './Categories.css';
import CategoryAddForm from './dumbs/CategoryAddForm';
import CategoryList from './dumbs/CategoryList';

interface props {
  open: boolean
  onClose: any
  categories: Category[]
  onAdd(category: CategoryAdd): void
}

interface state {}

export default class Categories extends React.Component<props, state> {
  constructor(props: any, state: any) {
    super(props)
    this.state = {}
    this.handleClose = this.handleClose.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  handleClose(): void {
    this.props.onClose()
  }

  handleCategoryChange(event: any): void {
    console.log(event.target.value)
    this.setState({ categoryToAdd: event.target.value })
  }

  onAdd(category: CategoryAdd): void {
    this.props.onAdd(category)
  }

  render(): JSX.Element {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.handleClose}>
        <AppBar className="appBar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Categories
            </Typography>
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="dialogBody">
          <CategoryAddForm onAdd={this.onAdd} />
          <CategoryList categories={this.props.categories} />
        </div>
      </Dialog>
    )
  }
}