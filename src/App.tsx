import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import './App.css';
import Api from './services/Api'
import Category from './models/Category'
import Provider from './models/Provider'
import Product from './models/Product'
import Login from './login/Login'
import Categories from './components/Categories'


interface props { }
interface state {
  connected: boolean,
  categories: Category[],
  providers: Provider[],
  products: Product[],
  showCategories: boolean
}

export default class App extends React.Component<props, state> {

  api: Api = new Api()

  constructor(props: any, state: any) {
    super(props)
    this.state = {
      connected: localStorage.getItem('user') !== null,
      categories: [],
      providers: [],
      products: [],
      showCategories: false
    }
    this.login = this.login.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getProviders = this.getProviders.bind(this)
    this.getProducts = this.getProducts.bind(this)
    this.navigationHandleChange = this.navigationHandleChange.bind(this)
    this.closeCategories = this.closeCategories.bind(this)
  }

  async componentDidMount(): Promise<void> {
    if (this.state.connected) {
      this.getLists()
    }
  }

  async getLists(): Promise<void> {
    await this.getCategories()
    await this.getProviders()
    await this.getProducts()
  }

  async getCategories(): Promise<void> {
    this.setState({ categories: await this.api.get('categories') })
  }

  async getProviders(): Promise<void> {
    this.setState({ providers: await this.api.get('providers') })
  }

  async getProducts(): Promise<void> {
    this.setState({ products: await this.api.get('products') })
  }

  async login(username: string, password: string): Promise<void> {
    const response = await this.api.post('authentication/login', { username: username, password: password }, false)
    if (response !== null) {
      localStorage.setItem('user', JSON.stringify(response))
      this.setState({ connected: true })
      this.getLists()
    }
  }

  async closeCategories(): Promise<void> {
    this.setState({ showCategories: false })
    await this.getCategories()
  }

  navigationHandleChange(event: React.ChangeEvent<{}>, newValue: string): void {
    switch (newValue) {
      case 'logout':
        localStorage.clear()
        window.location.reload(false);
        break
      case 'categories':
        this.setState({ showCategories: true })
        break
      default:
    }
  }

  render(): JSX.Element {
    let view;
    if (this.state.connected) {
      view =
        <div>
          <div>
            <Categories open={this.state.showCategories} onClose={ this.closeCategories } />
          </div>
          <BottomNavigation className="bottomNavigation" onChange={this.navigationHandleChange} showLabels>
            <BottomNavigationAction label="Categories" value="categories" icon={<Icon>category</Icon>} />
            <BottomNavigationAction label="Log out" value="logout" icon={<Icon>exit_to_app</Icon>} />
          </BottomNavigation>
        </div>

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
