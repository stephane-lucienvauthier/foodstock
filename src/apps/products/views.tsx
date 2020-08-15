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
import { ProductsProps, ProductsState, ProductListProps, ProductListState, ProductListRowProps, ProductListRowState } from './interfaces'
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

export default class Products extends React.Component<ProductsProps, ProductsState> {
  constructor(props: ProductsProps, state: ProductsState) {
    super(props)
    this.state = {}
  }

  render(): JSX.Element {
    return (
      <div className="productView">
        <ProductList products={this.props.products} />
      </div>
    )
  }
}


