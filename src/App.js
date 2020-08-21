import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import Login from './components/Login'
import { LoginApi } from './services/Api'

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
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

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

  function onCloseSnackbar() {
    setSnackbarMessage('')
    setSnackbarSeverity('success')
  }

  return (
    <div className={classes.app}>
      {
        !connected && <Login login={onLogin} />
      }
      <Snackbar open={snackbarMessage !== ''} autoHideDuration={6000} onClose={onCloseSnackbar}>
        <Alert onClose={onCloseSnackbar} severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  )
}
