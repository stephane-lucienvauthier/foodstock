import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import MuiAlert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import Login from './components/Login'
import BatchDelete from './components/BatchDelete'
import BatchDialog from './components/BatchDialog'
import CategoryDelete from './components/CategoryDelete'
import CategoryDialog from './components/CategoryDialog'
import CategoryList from './components/CategoryList'
import Menu from './components/Menu'
import ProductDelete from './components/ProductDelete'
import ProductDialog from './components/ProductDialog'
import ProductList from './components/ProductList'
import ProviderDelete from './components/ProviderDelete'
import ProviderDialog from './components/ProviderDialog'
import ProviderList from './components/ProviderList'
import {
  BatchAddApi,
  BatchUpdateApi,
  BatchDeleteApi,
  CategoryAddApi,
  CategoryUpdateApi,
  CategoryDeleteApi,
  CategoryListApi,
  LoginApi,
  ProductAddApi,
  ProductUpdateApi,
  ProductDeleteApi,
  ProductListApi,
  ProviderAddApi,
  ProviderGetApi,
  ProviderUpdateApi,
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
  const [batchDeleteDialogOpen, setBatchDeleteDialogOpen] = useState(false)
  const [batchEditDialogOpen, setBatchEditDialogOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoryDeleteDialogOpen, setCategoryDeleteDialogOpen] = useState(false)
  const [categoryEditDialogOpen, setCategoryEditDialogOpen] = useState(false)
  const [currentBatch, setCurrentBatch] = useState(null)
  const [currentCategory, setCurrentCategory] = useState(undefined)
  const [currentProduct, setCurrentProduct] = useState(undefined)
  const [currentProvider, setCurrentProvider] = useState(undefined)
  const [currentProviderDetails, setCurrentProviderDetails] = useState(undefined)
  const [currentUnit, setCurrentUnit] = useState('')
  const [connected, setConnected] = useState(localStorage.getItem('user') !== null)
  const [products, setProducts] = useState([])
  const [productDeleteDialogOpen, setProductDeleteDialogOpen] = useState(false)
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

  const onBatchDeleteDialogOpen = (productId, id) => {
    setCurrentBatch(id)
    setCurrentProduct(productId)
    setBatchDeleteDialogOpen(true)
  }

  const onBatchDeleteDialogClose = async (validation) => {
    if (validation) {
      const response = await BatchDeleteApi(currentProduct, currentBatch)
      if (response) {
        let p = products
        let index = p.findIndex(x => x.id === currentProduct)
        if (index >= 0) {
          let indexBatch = p[index].batches.findIndex(x => x.id === currentBatch)
          p[index].batches.splice(indexBatch, 1)
          setProducts(p)
        }
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setCurrentProduct(null)
    setCurrentBatch(null)
    setBatchDeleteDialogOpen(false)
  }

  const onBatchEditDialogOpen = (productId, id, unit) => {
    if (id !== undefined) {
      setCurrentBatch(id)
    }
    setCurrentProduct(productId)
    setCurrentUnit(unit)
    setBatchEditDialogOpen(true)
  }

  const onBatchEditDialogClose = async (batch) => {
    if (batch !== undefined && currentProduct !== undefined) {
      let response
      if (currentBatch !== undefined) {
        response = await BatchUpdateApi(currentProduct, currentBatch, batch)
        if (response) {
          let index = products.findIndex(x => x.id === currentProduct)
          if (index >= 0) {
            let indexBatch = products[index].batches.findIndex(x => x.id === currentBatch)
            products[index].batches[indexBatch] = response
          }
        } else {
          setSnackbarSeverity('error')
          setSnackbarMessage('An error was occured. Retry later.')
        }
      } else {
        response = await BatchAddApi(currentProduct, batch)
        if (response) {
          let index = products.findIndex(x => x.id === currentProduct)
          if (index >= 0) {
            products[index].batches.push(response)
          }
        } else {
          setSnackbarSeverity('error')
          setSnackbarMessage('An error was occured. Retry later.')
        }
      }
    }
    setCurrentBatch(undefined)
    setCurrentProduct(undefined)
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
        c.splice(index, 1)
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

  const onCategoryEditDialogOpen = (id) => {
    if (id !== undefined) {
      setCurrentCategory(id)
    }
    setCategoryEditDialogOpen(true)
  }

  const onCategoryEditDialogClose = async (category) => {
    if (category !== undefined) {
      let response
      if (currentCategory !== undefined) {
        response = await CategoryUpdateApi(currentCategory, category)
        if (response) {
          let c = categories
          let index = c.findIndex(x => x.id === currentCategory)
          if (index >= 0) {
            c[index] = response
            setCategories(c)
          }
        } else {
          setSnackbarSeverity('error')
          setSnackbarMessage('An error was occured. Retry later.')
        }
      } else {
        response = await CategoryAddApi(category)
        if (response) {
          let c = categories
          c.push(response)
          setCategories(c)
        } else {
          setSnackbarSeverity('error')
          setSnackbarMessage('An error was occured. Retry later.')
        }
      }
    }
    setCurrentCategory(undefined)
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

  const onProductDeleteDialogOpen = (id) => {
    setCurrentProduct(id)
    setProductDeleteDialogOpen(true)
  }

  const onProductDeleteDialogClose = async (validation) => {
    if (validation) {
      const response = await ProductDeleteApi(currentProduct)
      if (response) {
        let p = products
        let index = p.findIndex(x => x.id === currentProduct)
        p.splice(index, 1)
        setProducts(p)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setCurrentProduct(null)
    setProductDeleteDialogOpen(false)
  }

  const onProductEditDialogOpen = (id) => {
    if (id !== undefined) {
      setCurrentProduct(id)
    }
    setProductEditDialogOpen(true)
  }

  const onProductEditDialogClose = async (product) => {
    if (product !== undefined) {
      let response
      if (currentProduct !== undefined) {
        response = await ProductUpdateApi(currentProduct, product)
        if (response) {
          let p = products
          let index = p.findIndex(x => x.id === currentProduct)
          if (index >= 0) {
            response.batches = p[index].batches
            p[index] = response
            setProducts(p)
          }
        } else {
          setSnackbarSeverity('error')
          setSnackbarMessage('An error was occured. Retry later.')
        }
      } else {
        response = await ProductAddApi(product)
        if (response) {
          let p = products
          p.push(response)
          setProducts(p)
        } else {
          setSnackbarSeverity('error')
          setSnackbarMessage('An error was occured. Retry later.')
        }
      }
    }
    setCurrentProduct(undefined)
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

  const onProviderEditDialogOpen = async (id) => {
    if (id !== undefined) {
      const response = await ProviderGetApi(id)
      if (response) {
        setCurrentProviderDetails(response)
        setCurrentProvider(id)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
      }
    }
    setProviderEditDialogOpen(true)
  }

  const onProviderEditDialogClose = async (provider) => {
    if (provider !== undefined) {
      let response
      if (currentProvider !== undefined) {
        response = await ProviderUpdateApi(currentProvider, provider)
        if (response) {
          let p = providers
          let index = p.findIndex(x => x.id === currentProvider)
          if (index >= 0) {
            p[index] = response
            setProviders(p)
          }
        } else {
          setSnackbarSeverity('error')
          setSnackbarMessage('An error was occured. Retry later.')
        }
      } else {
        response = await ProviderAddApi(provider)
        if (response) {
          let p = providers
          p.push(response)
          setProviders(p)
        } else {
          setSnackbarSeverity('error')
          setSnackbarMessage('An error was occured. Retry later.')
        }
      }
    }
    setCurrentProviderDetails(undefined)
    setCurrentProvider(undefined)
    setProviderEditDialogOpen(false)
  }

  const onRoute = (event, menu) => {
    switch (menu) {
      case 'logout':
        localStorage.clear()
        window.location.reload(false);
        break;
      default:
    }
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
            <Grid item xs={12}>
              <Paper elevation={0}>
                <Menu onRoute={onRoute} />
              </Paper>

            </Grid>
            <Grid item xs={2}>
              <Paper elevation={3}>
                <CategoryList categories={categories} onEditDialogOpen={onCategoryEditDialogOpen} onDeleteDialogOpen={onCategoryDeleteDialogOpen} />
                <Divider />
                <ProviderList providers={providers} onEditDialogOpen={onProviderEditDialogOpen} onDeleteDialogOpen={onProviderDeleteDialogOpen} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={3}>
                <ProductList products={products} onEditDialogOpen={onProductEditDialogOpen} onDeleteDialogOpen={onProductDeleteDialogOpen} onBatchEditDialogOpen={onBatchEditDialogOpen} onBatchDeleteDialogOpen={onBatchDeleteDialogOpen} />
              </Paper>
            </Grid>
          </Grid>
        </>
      }
      <BatchDelete open={batchDeleteDialogOpen} onClose={onBatchDeleteDialogClose} />
      <BatchDialog open={batchEditDialogOpen} onClose={onBatchEditDialogClose} providers={providers} unit={currentUnit} batch={currentBatch !== undefined && currentProduct !== undefined ? products.find(x => x.id === currentProduct).batches.find(x => x.id === currentBatch) : undefined} />
      <CategoryDelete open={categoryDeleteDialogOpen} onClose={onCategoryDeleteDialogClose} />
      <CategoryDialog open={categoryEditDialogOpen} onClose={onCategoryEditDialogClose} category={currentCategory !== undefined ? categories.find(x => x.id === currentCategory) : undefined} />
      <ProductDelete open={productDeleteDialogOpen} onClose={onProductDeleteDialogClose} />
      <ProductDialog open={productEditDialogOpen} onClose={onProductEditDialogClose} categories={categories} product={currentProduct !== undefined ? products.find(x => x.id === currentProduct) : undefined} />
      <ProviderDelete open={providerDeleteDialogOpen} onClose={onProviderDeleteDialogClose} />
      <ProviderDialog open={providerEditDialogOpen} onClose={onProviderEditDialogClose} provider={currentProviderDetails} />
      <Snackbar open={snackbarMessage !== ''} autoHideDuration={6000} onClose={onCloseSnackbar}>
        <Alert onClose={onCloseSnackbar} severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  )
}
