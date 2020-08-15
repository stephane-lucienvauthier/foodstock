import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { LoginProps, LoginState } from './interfaces'
import './style.css';

export default class LoginView extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps, state: LoginState) {
    super(props)
    this.state = {
      login: {username: '', password: ''}
    }
    this.login = this.login.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  formChange(event: any): void {
    switch (event.target.name) {
      case 'username':
        this.setState({ login: { username: event.target.value, password: this.state.login.password } })
        break
      case 'password':
        this.setState({ login: { username: this.state.login.username, password: event.target.value} })
        break
      default:
    }
  }

  login(): void {
    this.props.onlogin(this.state.login)
  }

  render(): JSX.Element {
    return (
      <Container maxWidth="sm" className="Login">
        <Paper elevation={1} className="loginPaper">
          <h1>Foodstock</h1>
        <form>
          <TextField className="textfield" label="Username" name="username" value={this.state.login.username} onChange={this.formChange} />
          <TextField label="Password" type="password" name="password" value={this.state.login.password} onChange={this.formChange} />
          <div className="actions">
            <Button type="button" variant="outlined" color="primary" onClick={this.login}>Login</Button>
          </div>
        </form>
        </Paper>
      </Container>
    )
  }
}
