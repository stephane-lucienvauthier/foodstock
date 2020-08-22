import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import MuiAlert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import Login from './components/Login'
import CategoryDialog from './components/CategoryDialog'
import CategoryList from './components/CategoryList'
import ProductDialog from './components/ProductDialog'
import ProductList from './components/ProductList'
import ProviderDialog from './components/ProviderDialog'
import ProviderList from './components/ProviderList'
import { 
  CategoryAddApi,
  CategoryListApi, 
  LoginApi,
  ProductAddApi,
  ProductListApi,
  ProviderAddApi,
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
  const [categories, setCategories] = useState([])
  const [categoryEditDialogOpen, setCategoryEditDialogOpen] = useState(false)
  const [connected, setConnected] = useState(localStorage.getItem('user') !== null)
  const [products, setProducts] = useState([])
  const [productEditDialogOpen, setProductEditDialogOpen] = useState(false)
  const [providers, setProviders] = useState([])
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
                <CategoryList categories={categories} onEditDialogOpen={onCategoryEditDialogOpen} />
                <Divider />
                <ProviderList providers={providers} onEditDialogOpen={onProviderEditDialogOpen} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={3}>
                <ProductList products={products} onEditDialogOpen={onProductEditDialogOpen} />
              </Paper>
            </Grid>
          </Grid>
        </>
      }
      <CategoryDialog open={categoryEditDialogOpen} onClose={onCategoryEditDialogClose} />
      <ProductDialog open={productEditDialogOpen} onClose={onProductEditDialogClose} categories={categories} />
      <ProviderDialog open={providerEditDialogOpen} onClose={onProviderEditDialogClose} />
      <Snackbar open={snackbarMessage !== ''} autoHideDuration={6000} onClose={onCloseSnackbar}>
        <Alert onClose={onCloseSnackbar} severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  )
}
