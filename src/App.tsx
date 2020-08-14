import React from 'react';
import './App.css';
import Api from './services/Api'
import { Category, CategoryAdd } from './apps/categories/models'
import { Provider, ProviderAdd } from './apps/providers/models'
import Menu from './apps/menu/Menu'
import Product from './models/Product'
import Login from './apps/login/Login'
import Categories from './apps/categories/Categories'
import Providers from './apps/providers/Providers'

interface props { }
interface state {
  connected: boolean,
  categories: Category[],
  providers: Provider[],
  products: Product[],
  currentView: string
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
      currentView: 'products'
    }
    this.router = this.router.bind(this)
    this.login = this.login.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getProviders = this.getProviders.bind(this)
    this.getProducts = this.getProducts.bind(this)
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

  router(route: string): void {
    if (route === 'logout') {
      localStorage.clear()
      window.location.reload(false);
    } else {
      this.setState({ currentView: route })
    }
  }

  render(): JSX.Element {
    return (
      <div className="App">
        {(() => {
          if (this.state.connected) {
            switch (this.state.currentView) {
              case 'products':
                return <React.Fragment>
                  Products
                  <Menu onRouter={this.router} />
                  </React.Fragment>
              case 'categories':
                return <React.Fragment>
                  <Categories categories={this.state.categories} onAdd={this.onCategoryAdd} />
                  <Menu onRouter={this.router} />
                </React.Fragment>
              case 'providers':
                return <React.Fragment>
                  <Providers providers={this.state.providers} onAdd={this.onProviderAdd} />
                  <Menu onRouter={this.router} />
                </React.Fragment>

              default:
                return null;
            }

          } else {
            return <Login onlogin={this.login} />
          }
        })()}
      </div>
    )
  }
}
