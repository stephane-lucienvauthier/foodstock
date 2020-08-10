import React from 'react';
import './App.css';
import Login from './login/Login'
import Api from './services/Api'

interface props { }
interface state {
  connected: boolean
}

export default class App extends React.Component<props, state> {

  api: Api = new Api()

  constructor(props: any, state: any) {
    super(props)
    this.state = {
      connected: localStorage.getItem('user') !== null
    }
    this.login = this.login.bind(this)
  }

  async login(username: string, password: string): Promise<void> {
    const response = await this.api.post('authentication/login', { username: username, password: password }, false)
    if (response !== null) {
      localStorage.setItem('user', JSON.stringify(response))
      this.setState({ connected: true })
    }
  }

  render(): JSX.Element {
    let view;
    if (this.state.connected) {
      view = <h1>Connected</h1>
    } else {
      view = <Login onlogin={this.login} />
    }

    return (
      <div className="App">
        {view}
      </div>
    )
  }
}
