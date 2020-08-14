import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import './App.css';
import Api from './services/Api'
import { Category, CategoryAdd } from './apps/categories/models'
import { Provider, ProviderAdd } from './apps/providers/models'
import Product from './models/Product'
import Login from './login/Login'
import Categories from './apps/categories/Categories'
import Providers from './apps/providers/Providers'

interface props { }
interface state {
  connected: boolean,
  categories: Category[],
  providers: Provider[],
  products: Product[],
  showCategories: boolean,
  showProviders: boolean
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
      showCategories: false,
      showProviders: false
    }
    this.login = this.login.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getProviders = this.getProviders.bind(this)
    this.getProducts = this.getProducts.bind(this)
    this.navigationChange = this.navigationChange.bind(this)
    this.closeCategories = this.closeCategories.bind(this)
    this.closeProviders = this.closeProviders.bind(this)
    this.onCategoryAdd = this.onCategoryAdd.bind(this)
    this.onProviderAdd = this.onProviderAdd.bind(this)
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

  closeCategories(): void {
    this.setState({ showCategories: false })
  }

  closeProviders(): void {
    this.setState({ showProviders: false })
  }

  async onCategoryAdd(category: CategoryAdd): Promise<void> {
    const response = await this.api.post('categories', category)
    if (response !== null) {
      await this.getCategories()
    }
  }

  async onProviderAdd(provider: ProviderAdd): Promise<void> {
    const response = await this.api.post('providers', provider)
    if (response !== null) {
      await this.getProviders()
    }
  }

  navigationChange(event: React.ChangeEvent<{}>, newValue: string): void {
    switch (newValue) {
      case 'logout':
        localStorage.clear()
        window.location.reload(false);
        break
      case 'categories':
        this.setState({ showCategories: true })
        break
      case 'providers':
        this.setState({ showProviders: true })
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
            <Categories open={this.state.showCategories} onClose={this.closeCategories} categories={this.state.categories} onAdd={this.onCategoryAdd} />
            <Providers open={this.state.showProviders} onClose={this.closeProviders} providers={this.state.providers} onAdd={this.onProviderAdd} />
          </div>
          <BottomNavigation className="bottomNavigation" onChange={this.navigationChange} showLabels>
            <BottomNavigationAction label="Categories" value="categories" icon={<Icon>category</Icon>} />
            <BottomNavigationAction label="Providers" value="providers" icon={<Icon>business</Icon>} />
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
