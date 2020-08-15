import React from 'react';
import { AppProps, AppState } from './interfaces'
import './style.css';
import { LoginApi, CategoriesApi, ProvidersApi, ProductsApi } from './api'
import { Category, CategoryAdd } from '../categories/models'
import { Provider, ProviderAdd } from '../providers/models'
import { Login, Authentication } from '../login/models'
import LoginView from '../login/views'
import Menu from '../menu/views'
import Categories from '../categories/views'
import Providers from '../providers/views'
import Products from '../products/views'

export default class App extends React.Component<AppProps, AppState> {

  loginApi: LoginApi = new LoginApi()
  categoriesApi: CategoriesApi = new CategoriesApi()
  providersApi: ProvidersApi = new ProvidersApi()
  productsApi: ProductsApi = new ProductsApi()

  constructor(props: AppProps, state: AppState) {
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
      await this.getCategories()
      await this.getProviders()
      await this.getProducts()
    }
  }

  async login(login: Login): Promise<void> {
    const response: Authentication = await this.loginApi.authenticate(login)
    if (response !== null) {
      localStorage.setItem('user', JSON.stringify(response))
      this.setState({ connected: true })
      await this.getCategories()
      await this.getProviders()
      await this.getProducts()
    }
  }

  async getCategories(): Promise<void> {
    this.setState({ categories: await this.categoriesApi.list() })
  }

  async getProviders(): Promise<void> {
    this.setState({ providers: await this.providersApi.list() })
  }

  async getProducts(): Promise<void> {
    this.setState({ products: await this.productsApi.list() })
  }

  async onCategoryAdd(category: CategoryAdd): Promise<void> {
    const response: Category[] = await this.categoriesApi.add(category)
    if (response !== null) {
      await this.getCategories()
    }
  }

  async onProviderAdd(provider: ProviderAdd): Promise<void> {
    const response: Provider[] = await this.providersApi.add(provider)
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
                  <Products products={this.state.products} />
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
            return <LoginView onlogin={this.login} />
          }
        })()}
      </div>
    )
  }
}
