import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import MuiAlert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import Login from './components/Login'
import CategoryList from './components/CategoryList'
import ProviderList from './components/ProviderList'
import { LoginApi, CategoryListApi, ProviderListApi } from './services/Api'

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
  const [connected, setConnected] = useState(localStorage.getItem('user') !== null)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  function onCloseSnackbar() {
    setSnackbarMessage('')
    setSnackbarSeverity('success')
  }

  async function onLogin(username, password) {
    const response = await LoginApi(username, password)
    if (response) {
      localStorage.setItem('user', JSON.stringify(response))
      setConnected(true)
    } else {
      setSnackbarSeverity('error')
      setSnackbarMessage('The login / Username does not exist.')
    }
  }

  useEffect(() => {
    async function listCategories() {
      const response = await CategoryListApi()
      if (response) {
        setCategories(response)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
        setCategories([])
      }
    }
    listCategories()

    async function listProviders() {
      const response = await ProviderListApi()
      if (response) {
        setProviders(response)
      } else {
        setSnackbarSeverity('error')
        setSnackbarMessage('An error was occured. Retry later.')
        setProviders([])
      }
    }
    listProviders()
    
  }, []);

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
                <CategoryList categories={categories} />
                <Divider />
                <ProviderList providers={providers} />
              </Paper>
            </Grid>
          </Grid>
        </>
      }
      <Snackbar open={snackbarMessage !== ''} autoHideDuration={6000} onClose={onCloseSnackbar}>
        <Alert onClose={onCloseSnackbar} severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  )
}
