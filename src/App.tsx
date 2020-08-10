import React from 'react';
import './App.css';
import Login from './login/Login'
import Api from './services/Api'
import Category from './models/Category'
import Provider from './models/Provider'

interface props { }
interface state {
  connected: boolean,
  categories: Category[],
  providers: Provider[]
}

export default class App extends React.Component<props, state> {

  api: Api = new Api()

  constructor(props: any, state: any) {
    super(props)
    this.state = {
      connected: localStorage.getItem('user') !== null,
      categories: [],
      providers: [],
    }
    this.login = this.login.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getProviders = this.getProviders.bind(this)
  }

  async componentDidMount(): Promise<void>
  {
    if (this.state.connected) {
      this.getLists()
    }
  }

  async getLists(): Promise<void> {
    await this.getCategories()
    await this.getProviders()
  }

  async getCategories(): Promise<void> {
    this.setState({ categories: await this.api.get('categories') })
  }

  async getProviders(): Promise<void> {
    this.setState({ providers: await this.api.get('providers') })
  }

  async login(username: string, password: string): Promise<void> {
    const response = await this.api.post('authentication/login', { username: username, password: password }, false)
    if (response !== null) {
      localStorage.setItem('user', JSON.stringify(response))
      this.setState({ connected: true })
      this.getLists()
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
