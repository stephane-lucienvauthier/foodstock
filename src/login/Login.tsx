import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './Login.css';

interface props {
  onlogin: any
}

interface state {
  username: string
  password: string
  disableLogin: boolean
}

export default class Login extends React.Component<props, state> {
  constructor(props: any, state: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      disableLogin: true
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleForm = this.handleForm.bind(this)
  }

  handleForm(event: any): void {
    switch (event.target.name) {
      case 'username':
        this.setState({username: event.target.value})
        break
      case 'password':
        this.setState({password: event.target.value})
        break
      default:
    }
    this.setState({disableLogin: (this.state.username === "" || this.state.password === "")});
  }

  handleLogin(): void {
    this.props.onlogin(this.state.username, this.state.password)
  }

  render(): JSX.Element {
    return (
      <Container maxWidth="sm" className="Login">
        <Paper elevation={1}>
          <h1>Foodstock</h1>
        <form>
          
          <TextField className="textfield" label="Username" name="username" value={this.state.username} onChange={this.handleForm} />
          <TextField label="Password" type="password" name="password" value={this.state.password} onChange={this.handleForm} />
          <div className="actions">
            <Button type="button" variant="outlined" color="primary" onClick={this.handleLogin} disabled={this.state.disableLogin}>Login</Button>
          </div>
        </form>
        </Paper>
      </Container>
    )
  }
}
