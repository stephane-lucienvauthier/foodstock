import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { Icon } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <>
      <TableRow key={props.product.id} className={classes.root}>
        <TableCell>
          {(props.product.batches !== undefined && props.product.batches.length > 0) && (
            <>
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
              </IconButton>
            </>
          )}
        </TableCell>
        <TableCell component="th" scope="row">{props.product.label}</TableCell>
        <TableCell align="right">{props.product.unit}</TableCell>
        <TableCell align="right">{props.product.category}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
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
                  {props.product.batches !== undefined && props.product.batches.map((batch) => (
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
    </>
  )
}

export default function ProductList(props) {
  return (
      <Table className="productsTable" size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Label</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((product) => (
            <Row key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
  )
}