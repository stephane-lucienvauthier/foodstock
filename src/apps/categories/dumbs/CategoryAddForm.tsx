import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { CategoryAdd } from '../models'
import './CategoryAddForm.css';

interface props {
  onAdd(category: CategoryAdd): void
}

interface state {
  category: CategoryAdd
}

export default class CategoryAddForm extends React.Component<props, state> {
  constructor(props: any, state: any) {
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