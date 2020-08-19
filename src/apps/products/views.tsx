import React from 'react'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import DateFnsUtils from '@date-io/date-fns'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import { Icon, Button } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import { SaveInterface, RemoveInterface, ShowDialogInterface } from '../core/interfaces'
import { MainProps, MainState, ListProps, ListRowProps, ListRowState, SaveProps, SaveState, RemoveProps, BatchSaveProps, BatchSaveState } from './interfaces'
import { Product, ProductSave, BatchSave } from './models'

class BatchSaveForm extends React.Component<BatchSaveProps, BatchSaveState> implements SaveInterface<BatchSave> {
  constructor(props:BatchSaveProps, state: BatchSaveState) {
    super(props)
    this.state = {
      obj: undefined
    }
    this.onSave = this.onSave.bind(this)
    this.onCancelSave = this.onCancelSave.bind(this)
    this.onChangeInitial = this.onChangeInitial.bind(this)
    this.onChangeCurrent = this.onChangeCurrent.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onChangePurchase = this.onChangePurchase.bind(this)
    this.onChangeLimit = this.onChangeLimit.bind(this)
    this.onChangeProvider = this.onChangeProvider.bind(this)
  }

  onChangeInitial(event: any) {
    let current, price, purchase, limit, provider
    if (this.state.obj !== undefined) {
      current = this.state.obj.current
      price = this.state.obj.price
      purchase = this.state.obj.purchase
      limit = this.state.obj.limit
      provider = this.state.obj.provider
    } else {
      current = 0.0
      price = 0.0
      purchase = new Date(Date.now())
      limit = new Date(Date.now())
      provider = 0
    }
    this.setState({
      obj: {
        initial: event.target.value,
        current: current,
        price: price,
        purchase: new Date(purchase.toDateString()),
        limit: new Date(limit.toDateString()),
        provider: provider
      }
    })
  }

  onChangeCurrent(event: any) {
    let initial, price, purchase, limit, provider
    if (this.state.obj !== undefined) {
      initial = this.state.obj.initial
      price = this.state.obj.price
      purchase = this.state.obj.purchase
      limit = this.state.obj.limit
      provider = this.state.obj.provider
    } else {
      initial = 0.0
      price = 0.0
      purchase = new Date(Date.now())
      limit = new Date(Date.now())
      provider = 0
    }
    this.setState({
      obj: {
        initial: initial,
        current: event.target.value,
        price: price,
        purchase: new Date(purchase.toDateString()),
        limit: new Date(limit.toDateString()),
        provider: provider
      }
    })
  }

  onChangePrice(event: any) {
    let initial, current, purchase, limit, provider
    if (this.state.obj !== undefined) {
      initial = this.state.obj.initial
      current = this.state.obj.current
      purchase = this.state.obj.purchase
      limit = this.state.obj.limit
      provider = this.state.obj.provider
    } else {
      initial = 0.0
      current = 0.0
      purchase = new Date(Date.now())
      limit = new Date(Date.now())
      provider = 0
    }
    this.setState({
      obj: {
        initial: initial,
        current: current,
        price: event.target.value,
        purchase: new Date(purchase.toDateString()),
        limit: new Date(limit.toDateString()),
        provider: provider
      }
    })
  }

  onChangePurchase(purchase: any) {
    let initial, current, price, limit, provider
    if (this.state.obj !== undefined) {
      initial = this.state.obj.initial
      current = this.state.obj.current
      price = this.state.obj.price
      limit = this.state.obj.limit
      provider = this.state.obj.provider
    } else {
      initial = 0.0
      current = 0.0
      price = 0.0
      limit = new Date(Date.now())
      provider = 0
    }
    this.setState({
      obj: {
        initial: initial,
        current: current,
        price: price,
        purchase: new Date(purchase.toDateString()),
        limit: new Date(limit.toDateString()),
        provider: provider
      }
    })
  }

  onChangeLimit(limit: any) {
    let initial, current, price, purchase, provider
    if (this.state.obj !== undefined) {
      initial = this.state.obj.initial
      current = this.state.obj.current
      price = this.state.obj.price
      purchase = this.state.obj.purchase
      provider = this.state.obj.provider
    } else {
      initial = 0.0
      current = 0.0
      price = 0.0
      purchase = new Date(Date.now())
      provider = 0
    }
    this.setState({
      obj: {
        initial: initial,
        current: current,
        price: price,
        purchase: new Date(purchase.toDateString()),
        limit: new Date(limit.toDateString()),
        provider: provider
      }
    })
  }

  onChangeProvider(event: any) {
    let initial, current, price, purchase, limit
    if (this.state.obj !== undefined) {
      initial = this.state.obj.initial
      current = this.state.obj.current
      price = this.state.obj.price
      purchase = this.state.obj.purchase
      limit = this.state.obj.limit
    } else {
      initial = 0.0
      current = 0.0
      price = 0.0
      purchase = new Date(Date.now())
      limit = new Date(Date.now())
    }
    this.setState({
      obj: {
        initial: initial,
        current: current,
        price: price,
        purchase: new Date(purchase.toDateString()),
        limit: new Date(limit.toDateString()),
        provider: event.target.value
      }
    })
  }

  onSave(obj?: BatchSave): void {
    if (obj !== undefined) {
      this.props.onSave(obj)
    }
    this.setState({
      obj: {
        initial: 0.0,
        current: 0.0,
        price: 0.0,
        purchase: new Date(new Date(Date.now()).toDateString()),
        limit: new Date(new Date(Date.now()).toDateString()),
        provider: 0
      }
    })
  }

  onCancelSave(): void {
    this.props.onCancelSave()
    this.setState({
      obj: {
        initial: 0.0,
        current: 0.0,
        price: 0.0,
        purchase: new Date(new Date(Date.now()).toDateString()),
        limit: new Date(new Date(Date.now()).toDateString()),
        provider: 0
      }
    })
  }

  render(): JSX.Element {
    return (
      <Dialog open={this.props.open} onClose={this.onCancelSave}>
        <DialogTitle>Add a batch</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel htmlFor="initial">Initial</InputLabel>
            <Input id="initial" value={this.state.obj?.initial} onChange={this.onChangeInitial} endAdornment={<InputAdornment position="end">{this.props.unit}</InputAdornment>} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="current">Current</InputLabel>
            <Input id="current" value={this.state.obj?.current} onChange={this.onChangeCurrent} endAdornment={<InputAdornment position="end">{this.props.unit}</InputAdornment>} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input id="price" value={this.state.obj?.price} onChange={this.onChangePrice} endAdornment={<InputAdornment position="end">€</InputAdornment>} />
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" format="yyyy-MM-dd" margin="normal" id="purchase-picker" label="Purchase" value={this.state.obj?.purchase} onChange={this.onChangePurchase} />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" format="yyyy-MM-dd" margin="normal" id="limit-picker" label="Limit" value={this.state.obj?.limit} onChange={this.onChangeLimit} />
          </MuiPickersUtilsProvider>
          <FormControl fullWidth>
            <InputLabel id="provider-label">Provider</InputLabel>
            <Select labelId="provider-label" id="provider" onChange={this.onChangeProvider} value={this.state.obj?.provider} fullWidth>
              {this.props.providers.map((provider) => {
                const label = `${provider.label} (${provider.city})`
                return <MenuItem key={provider.id} value={provider.id}>{label}</MenuItem>
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancelSave} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => this.onSave(this.state.obj)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class RemoveForm extends React.Component<RemoveProps> implements RemoveInterface {
  constructor(props: RemoveProps) {
    super(props)
    this.onRemove = this.onRemove.bind(this)
    this.onCancelRemove = this.onCancelRemove.bind(this)
  }

  onRemove(): void {
    throw new Error("Method not implemented.")
  }

  onCancelRemove(): void {
    throw new Error("Method not implemented.")
  }

  render(): JSX.Element {
    return (<h1>Method not implemented.</h1>)
  }
}

class SaveForm extends React.Component<SaveProps, SaveState> implements SaveInterface<ProductSave> {
  constructor(props: SaveProps, state: SaveState) {
    super(props)
    this.state = {
      obj: undefined
    }
    this.onChangeLabel = this.onChangeLabel.bind(this)
    this.onChangeUnit = this.onChangeUnit.bind(this)
    this.onChangeCategory = this.onChangeCategory.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onCancelSave = this.onCancelSave.bind(this)
  }

  onChangeLabel(event: any): void {
    let unit, category
    if (this.state.obj !== undefined) {
      unit = this.state.obj.unit
      category = this.state.obj.category
    } else {
      unit = ''
      category = 0
    }
    this.setState({
      obj: {
        label: event.target.value,
        unit: unit,
        category: category
      }
    })
  }

  onChangeUnit(event: any): void {
    let label, category
    if (this.state.obj !== undefined) {
      label = this.state.obj.label
      category = this.state.obj.category
    } else {
      label = ''
      category = 0
    }
    this.setState({
      obj: {
        label: label,
        unit: event.target.value,
        category: category
      }
    })
  }

  onChangeCategory(event: any): void {
    let label, unit
    if (this.state.obj !== undefined) {
      label = this.state.obj.label
      unit = this.state.obj.unit
    } else {
      label = ''
      unit = ''
    }
    this.setState({
      obj: {
        label: label,
        unit: unit,
        category: event.target.value
      }
    })
  }

  onSave(obj?: ProductSave): void {
    if (obj !== undefined) {
      this.props.onSave(obj)
    }
    this.setState({
      obj: {
        label: "",
        unit: "",
        category: 0
      }
    })
  }

  onCancelSave(): void {
    this.props.onCancelSave()
    this.setState({
      obj: {
        label: "",
        unit: "",
        category: 0
      }
    })
  }

  render(): JSX.Element {
    return (
      <Dialog open={this.props.open} onClose={this.onCancelSave}>
        <DialogTitle>Add a product</DialogTitle>
        <DialogContent>
          <TextField className="textfield" label="label" name="label" onChange={this.onChangeLabel} fullWidth />
          <InputLabel id="unit-label">Unit</InputLabel>
          <Select labelId="unit-label" id="unit" value={this.state.obj?.unit} onChange={this.onChangeUnit} fullWidth>
            <MenuItem value="Kg">Kg</MenuItem>
            <MenuItem value="L">Litre</MenuItem>
            <MenuItem value="Unité">Unité</MenuItem>
          </Select>
          <InputLabel id="category-label">Category</InputLabel>
          <Select labelId="category-label" id="category" onChange={this.onChangeCategory} value={this.state.obj?.category} fullWidth>
            {this.props.categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancelSave} color="secondary">Cancel</Button>
          <Button onClick={() => { this.onSave(this.state.obj) }} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class ListRow extends React.Component<ListRowProps, ListRowState> {
  constructor(props: ListRowProps, state: ListRowState) {
    super(props)
    this.state = {
      open: false
    }
    this.open = this.open.bind(this)
    this.onShowBatchSaveForm = this.onShowBatchSaveForm.bind(this)
  }

  open(): void {
    this.setState({ open: !this.state.open })
  }

  onShowBatchSaveForm(): void {
    this.props.onShowBatchSaveForm(this.props.product)
  }

  render(): JSX.Element {
    return (
      <>
        <TableRow key={this.props.product.id}>
          <TableCell>
            {(this.props.product.batches !== undefined && this.props.product.batches.length > 0 ) && (
              <>
                <IconButton size="small" onClick={this.open}>
                  {this.state.open ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
                </IconButton>
              </>
            )}
          </TableCell>
          <TableCell component="th" scope="row">{this.props.product.label}</TableCell>
          <TableCell align="right">{this.props.product.unit}</TableCell>
          <TableCell align="right">{this.props.product.category}</TableCell>
          <TableCell align="right"><IconButton onClick={this.onShowBatchSaveForm}><Icon>add</Icon></IconButton></TableCell>
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
                    {this.props.product.batches !== undefined && (
                      <>
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
                      </>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }
}

class ListForm extends React.Component<ListProps> implements ShowDialogInterface<Product> {
  constructor(props: ListProps) {
    super(props)
    this.onShowSaveForm = this.onShowSaveForm.bind(this)
    this.onShowRemoveForm = this.onShowRemoveForm.bind(this)
  }

  onShowSaveForm(obj?: Product | undefined): void {
    this.props.onShowSaveForm(obj)
  }

  onShowRemoveForm(obj: Product): void {
    throw new Error("Method not implemented.")
  }

  render(): JSX.Element {
    return (
      <>
        <TableContainer component={Paper}>
          <Table className="productsTable">
            <TableHead>
              <TableRow>
                <TableCell><Button variant="contained" color="primary" onClick={() => this.onShowSaveForm(undefined)}>Add a product</Button></TableCell>
                <TableCell>Label</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.list.map((product) => (
                <ListRow onShowBatchSaveForm={this.props.onShowBatchSaveForm} key={product.id} product={product} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }
}

export default class Products extends React.Component<MainProps, MainState> implements SaveInterface<ProductSave>, RemoveInterface, ShowDialogInterface<Product> {
  constructor(props: MainProps, state: MainState) {
    super(props)
    this.state = {
      current: undefined,
      currentBatch: undefined,
      isUpdate: false,
      isBatchUpdate: false,
      showSaveForm: false,
      showRemoveForm: false,
      showBatchSaveForm: false
    }
    this.onSave = this.onSave.bind(this)
    this.onCancelSave = this.onCancelSave.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onCancelRemove = this.onCancelRemove.bind(this)
    this.onShowSaveForm = this.onShowSaveForm.bind(this)
    this.onShowRemoveForm = this.onShowRemoveForm.bind(this)
    this.onBatchSave = this.onBatchSave.bind(this)
    this.onBatchCancelSave = this.onBatchCancelSave.bind(this)
    this.onShowBatchSaveForm = this.onShowBatchSaveForm.bind(this)
  }

  onSave(obj: ProductSave): void {
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
    throw new Error("Method not implemented.")
  }

  onCancelRemove(): void {
    throw new Error("Method not implemented.")
  }

  async onShowSaveForm(obj?: Product | undefined): Promise<void> {
    this.setState({
      current: obj,
      showSaveForm: true,
      isUpdate: obj !== undefined
    })
  }

  onShowRemoveForm(obj: Product): Promise<void> {
    throw new Error("Method not implemented.")
  }

  onBatchSave(obj: BatchSave): void {
    if (this.state.current !== undefined) {
      if (this.state.currentBatch !== undefined) {
        this.props.onBatchSave(this.state.current.id, this.state.currentBatch.id, obj)
      } else {
        this.props.onBatchSave(this.state.current.id, 0, obj)
      }
    }
  }

  onBatchCancelSave(): void {
    this.setState({
      current: undefined,
      currentBatch: undefined,
      showBatchSaveForm: false
    })
  }

  onShowBatchSaveForm(product: Product): void {
    this.setState({
      showBatchSaveForm: true,
      current: product,
      isBatchUpdate: false
    })
  }

  render(): JSX.Element {
    const unit = this.state.current !== undefined ? this.state.current.unit : '' 
    return (
      <>
        <Paper elevation={3}>
          <ListForm list={this.props.list} onShowSaveForm={this.onShowSaveForm} onShowRemoveForm={this.onShowRemoveForm} onShowBatchSaveForm={this.onShowBatchSaveForm} />
          <SaveForm open={this.state.showSaveForm} obj={this.state.current} isUpdate={this.state.isUpdate} onSave={this.onSave} onCancelSave={this.onCancelSave} categories={this.props.categories} />
          <BatchSaveForm open={this.state.showBatchSaveForm} obj={this.state.currentBatch} isUpdate={this.state.isBatchUpdate} onSave={this.onBatchSave} onCancelSave={this.onBatchCancelSave} providers={this.props.providers} unit={unit} />
          {
            this.state.current && (
              <>
                <RemoveForm open={this.state.showRemoveForm} onRemove={this.onRemove} onCancelRemove={this.onCancelRemove} />
              </>
            )
          }
        </Paper>
      </>
    )
  }
}