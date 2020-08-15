import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { ProductsMenu } from '../menu/views'
import { ProductAdd } from './models'
import { ProductsProps, ProductsState, ProductListProps, ProductListState, ProductListRowProps, ProductListRowState, ProductAddFormProps, ProductAddFormState } from './interfaces'
import './style.css';

class ProductListRow extends React.Component<ProductListRowProps, ProductListRowState> {
  constructor(props: ProductListRowProps, state: ProductListRowState) {
    super(props)
    this.state = {
      open: false
    }
    this.open = this.open.bind(this)
  }

  open(): void {
    this.setState({ open: !this.state.open })
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <TableRow key={this.props.product.id}>
          <TableCell>
            <IconButton size="small" onClick={this.open}>
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">{this.props.product.label}</TableCell>
          <TableCell align="right">{this.props.product.unit}</TableCell>
          <TableCell align="right">{this.props.product.category}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Provider</TableCell>
                      <TableCell align="right">Initial Quantity</TableCell>
                      <TableCell align="right">Current Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Limit date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.product.batches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell component="th" scope="row">{batch.purchase}</TableCell>
                        <TableCell>{batch.provider}</TableCell>
                        <TableCell align="right">{batch.initial}</TableCell>
                        <TableCell align="right">{batch.current}</TableCell>
                        <TableCell align="right">{batch.price}</TableCell>
                        <TableCell align="right">{batch.limit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }
}

class ProductList extends React.Component<ProductListProps, ProductListState> {
  constructor(props: ProductListProps, state: ProductListState) {
    super(props)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <TableContainer component={Paper}>
        <Table className="productsTable">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Label</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.products.map((product) => (
              <ProductListRow key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

class ProductAddForm extends React.Component<ProductAddFormProps, ProductAddFormState> {
  constructor(props: ProductAddFormProps, state: ProductAddFormState) {
    super(props)
    this.state = {
      product: { label: "", unit: "Kg", category: 1 }
    }
    this.change = this.change.bind(this)
    this.changeUnit = this.changeUnit.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.add = this.add.bind(this)
    this.close = this.close.bind(this)
  }

  change(event: any): void {
    console.log(event.target.name)
    switch (event.target.name) {
      case 'label':
        this.setState({
          product: {
            label: event.target.value,
            unit: this.state.product.unit,
            category: this.state.product.category
          }
        })
        break
      default:
    }
  }

  changeUnit(event: any) {
    this.setState({
      product: {
        label: this.state.product.label,
        unit: event.target.value,
        category: this.state.product.category
      }
    })
  }

  changeCategory(event: any) {
    this.setState({
      product: {
        label: this.state.product.label,
        unit: this.state.product.unit,
        category: event.target.value
      }
    })
  }

  add(): void {
    this.props.onAdd(this.state.product)
  }

  close(): void {
    this.props.onCancel()
  }

  render(): JSX.Element {
    return (
      <Dialog open={this.props.open} onClose={this.close}>
        <DialogTitle>Add a product</DialogTitle>
        <DialogContent>
          <TextField className="textfield" label="label" name="label" onChange={this.change} fullWidth />
          <InputLabel id="unit-label">Unit</InputLabel>
          <Select labelId="unit-label" id="unit" value={this.state.product.unit} onChange={this.changeUnit} fullWidth>
            <MenuItem value="Kg">Kg</MenuItem>
            <MenuItem value="L">Litre</MenuItem>
            <MenuItem value="Unité">Unité</MenuItem>
          </Select>
          <InputLabel id="category-label">Age</InputLabel>
          <Select labelId="category-label" id="category" onChange={this.changeCategory} value={this.state.product.category} fullWidth>
            {this.props.categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
            ))}
          </Select>
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

export default class Products extends React.Component<ProductsProps, ProductsState> {
  constructor(props: ProductsProps, state: ProductsState) {
    super(props)
    this.state = {
      open: false
    }
    this.router = this.router.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onAdd(product: ProductAdd): void {
    this.props.onAdd(product)
    this.setState({ open: false })
  }

  onCancel(): void {
    this.setState({ open: false })
  }

  router(route: string): void {
    switch (route) {
      case 'add':
        this.setState({ open: true })
        break;
      default:
    }
  }

  render(): JSX.Element {
    return (
      <>
        <ProductsMenu onRouter={this.router} />
        <ProductList products={this.props.products} />
        <ProductAddForm open={this.state.open} onAdd={this.onAdd} onCancel={this.onCancel} categories={this.props.categories} />
      </>
    )
  }
}


