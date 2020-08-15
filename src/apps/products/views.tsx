import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ProductsProps, ProductsState, ProductListProps, ProductListState } from './interfaces'
import './style.css';

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
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">{product.label}</TableCell>
                <TableCell align="right">{product.unit}</TableCell>
                <TableCell align="right">{product.category}</TableCell>
              </TableRow>
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


