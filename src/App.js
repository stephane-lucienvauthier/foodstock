import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import MuiAlert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import Login from './components/Login'
import BatchDialog from './components/BatchDialog'
import CategoryDelete from './components/CategoryDelete'
import CategoryDialog from './components/CategoryDialog'
import CategoryList from './components/CategoryList'
import ProductDialog from './components/ProductDialog'
import ProductList from './components/ProductList'
import ProviderDelete from './components/ProviderDelete'
import ProviderDialog from './components/ProviderDialog'
import ProviderList from './components/ProviderList'
import { 
  BatchAddApi,
  CategoryAddApi,
  CategoryDeleteApi,
  CategoryListApi, 
  LoginApi,
  ProductAddApi,
  ProductListApi,
  ProviderAddApi,
  ProviderDeleteApi,
  ProviderListApi 
} from './services/Api'

const useStyles = makeStyles((theme) => ({
  app: {
    width: '100%',
    height: '100%'
  }
}))

function Alert(props) {
  return (<MuiAlert elevation={6} variant="filled" {...props} />)
}

export default function App() {
  const classes = useStyles()
  const [batchEditDialogOpen, setBatchEditDialogOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoryDeleteDialogOpen, setCategoryDeleteDialogOpen] = useState(false)
  const [categoryEditDialogOpen, setCategoryEditDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [currentProvider, setCurrentProvider] = useState(null)
  const [currentUnit, setCurrentUnit] = useState('')
  const [connected, setConnected] = useState(localStorage.getItem('user') !== null)
  const [products, setProducts] = useState([])
  const [productEditDialogOpen, setProductEditDialogOpen] = useState(false)
  const [providers, setProviders] = useState([])
  const [providerDeleteDialogOpen, setProviderDeleteDialogOpen] = useState(false)
  const [providerEditDialogOpen, setProviderEditDialogOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const onCloseSnackbar = () => {
    setSnackbarMessage('')
    setSnackbarSeverity('success')
  }

  const onLogin = async (username, password) => {
    const response = await LoginApi(username, password)
    if (response) {
      localStorage.setItem('user', JSON.stringify(response))
      setConnected(true)
      listCategories()
      listProviders()
      listProducts()
    } else {
      setSnackbarSeverity('error')
      setSnackbarMessage('The login / Username does not exist.')
    }
  }

  const onBatchEditDialogOpen = (id, unit) => {
    setCurrentProduct(id)
    setCurrentUnit(unit)
    setBatchEditDialogOpen(true)
  }

  const onBatchEditDialogClose = async (batch) => {
    if (batch !== undefined) {
      const response = await BatchAddApi(currentProduct, batch)
      if (response) {
        let index = products.findIndex(x => x.id === currentProduct)
        if(index  > 0) {
          products[index].batches.push(response)
        }
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setCurrentProduct(null)
    setBatchEditDialogOpen(false)
  }

  const listCategories = async () => {
    const response = await CategoryListApi()
    if (response) {
      setCategories(response)
    } else {
      setSnackbarSeverity('error')
      setSnackbarMessage('An error was occured. Retry later.')
      setCategories([])
    }
  }

  const onCategoryDeleteDialogOpen = (id) => {
    setCurrentCategory(id)
    setCategoryDeleteDialogOpen(true)
  }

  const onCategoryDeleteDialogClose = async (validation) => {
    if (validation) {
      const response = await CategoryDeleteApi(currentCategory)
      if (response) {
        let c = categories
        let index = c.findIndex(x => x.id === currentCategory)
        c.splice(index, 1);
        setCategories(c)
        await listProducts()
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setCurrentCategory(null)
    setCategoryDeleteDialogOpen(false)
  }

  const onCategoryEditDialogOpen = () => {
    setCategoryEditDialogOpen(true)
  }

  const onCategoryEditDialogClose = async (category) => {
    if (category !== undefined) {
      const response = await CategoryAddApi(category)
      if (response) {
        let c = categories
        c.push(response)
        setCategories(c)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setCategoryEditDialogOpen(false)
  }

  const listProducts = async () => {
    const response = await ProductListApi()
    if (response) {
      setProducts(response)
    } else {
      setSnackbarSeverity('error')
      setSnackbarMessage('An error was occured. Retry later.')
      setProducts([])
    }
  }

  const onProductEditDialogOpen = () => {
    setProductEditDialogOpen(true)
  }

  const onProductEditDialogClose = async (product) => {
    if (product !== undefined) {
      const response = await ProductAddApi(product)
      if (response) {
        let p = products
        p.push(response)
        setProducts(p)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setProductEditDialogOpen(false)
  }

  const listProviders = async () => {
    const response = await ProviderListApi()
    if (response) {
      setProviders(response)
    } else {
      setSnackbarSeverity('error')
      setSnackbarMessage('An error was occured. Retry later.')
      setProviders([])
    }
  }

  const onProviderDeleteDialogOpen = (id) => {
    setCurrentProvider(id)
    setProviderDeleteDialogOpen(true)
  }

  const onProviderDeleteDialogClose = async (validation) => {
    if (validation) {
      const response = await ProviderDeleteApi(currentProvider)
      if (response) {
        let p = providers
        let index = p.findIndex(x => x.id === currentProvider)
        p.splice(index, 1);
        setProviders(p)
        await listProducts()
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setCurrentProvider(null)
    setProviderDeleteDialogOpen(false)
  }

  const onProviderEditDialogOpen = () => {
    setProviderEditDialogOpen(true)
  }

  const onProviderEditDialogClose = async (provider) => {
    if (provider !== undefined) {
      const response = await ProviderAddApi(provider)
      if (response) {
        let p = providers
        p.push(response)
        setProviders(p)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setProviderEditDialogOpen(false)
  }

  useEffect(() => {
    if (connected) {
      listCategories()
      listProviders()
      listProducts()
    }
  }, [connected]);

  return (
    <div className={classes.app}>
      {
        !connected && <Login login={onLogin} />
      }
      {
        connected && <>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Paper elevation={3}>
                <CategoryList categories={categories} onEditDialogOpen={onCategoryEditDialogOpen} onDeleteDialogOpen={onCategoryDeleteDialogOpen} />
                <Divider />
                <ProviderList providers={providers} onEditDialogOpen={onProviderEditDialogOpen} onDeleteDialogOpen={onProviderDeleteDialogOpen} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={3}>
                <ProductList products={products} onEditDialogOpen={onProductEditDialogOpen} onBatchEditDialogOpen={onBatchEditDialogOpen} />
              </Paper>
            </Grid>
          </Grid>
        </>
      }
      <BatchDialog open={batchEditDialogOpen} onClose={onBatchEditDialogClose} providers={providers} unit={currentUnit} />
      <CategoryDelete open={categoryDeleteDialogOpen} onClose={onCategoryDeleteDialogClose} />
      <CategoryDialog open={categoryEditDialogOpen} onClose={onCategoryEditDialogClose} />
      <ProductDialog open={productEditDialogOpen} onClose={onProductEditDialogClose} categories={categories} />
      <ProviderDelete open={providerDeleteDialogOpen} onClose={onProviderDeleteDialogClose} />
      <ProviderDialog open={providerEditDialogOpen} onClose={onProviderEditDialogClose} />
      <Snackbar open={snackbarMessage !== ''} autoHideDuration={6000} onClose={onCloseSnackbar}>
        <Alert onClose={onCloseSnackbar} severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  )
}
