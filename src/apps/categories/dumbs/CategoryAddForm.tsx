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
  categoryLabel: string
}

export default class CategoryAddForm extends React.Component<props, state> {
  constructor(props: any, state: any) {
    super(props)
    this.state = {
      categoryLabel: ""
    }
    this.labelChange = this.labelChange.bind(this)
    this.add = this.add.bind(this)
  }

  labelChange(event: any): void {
    this.setState({ categoryLabel: event.target.value })
  }

  add(): void {
    this.props.onAdd({ label: this.state.categoryLabel })
  }

  render(): JSX.Element {
    return (
        <form>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <TextField className="textfield" label="label" name="label" onChange={this.labelChange} />
            </Grid>
            <Grid item xs={1}>
              <Button type="button" variant="contained" color="primary" onClick={this.add}>Add</Button>
            </Grid>
          </Grid>
        </form>
    )
  }
}