import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { Login } from '../accounts/models'
import { CategorySave } from '../categories/models'
import { ProviderSave } from '../providers/models'
import { Product, ProductSave, BatchSave } from '../products/models'
import { MainProps, MainState, MenuProps } from './interfaces'
import LoginView from '../accounts/views'
import Categories from '../categories/views'
import Providers from '../providers/views'
import Products from '../products/views'

class Menu extends React.Component<MenuProps> {
  constructor(props: MenuProps) {
    super(props)
    this.onRoute = this.onRoute.bind(this)
  }

  onRoute(event: React.ChangeEvent<{}>, route: string): void {
    this.props.onRoute(route)
  }

  render(): JSX.Element {
    return (
      <BottomNavigation onChange={this.onRoute} showLabels>
        <BottomNavigationAction label="Products" value="products" icon={<Icon>fastfood</Icon>} />
        <BottomNavigationAction label="Log out" value="logout" icon={<Icon>exit_to_app</Icon>} />
      </BottomNavigation>
    )
  }
}

export default class App extends React.Component<MainProps, MainState> {
  constructor(props: MainProps, state: MainState) {
    super(props)
    this.state = {
      connected: localStorage.getItem('user') !== null,
      currentView: 'products',
      categories: [],
      providers: [],
      products: []
    }
    this.onRoute = this.onRoute.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onCategoryList = this.onCategoryList.bind(this)
    this.onCategorySave = this.onCategorySave.bind(this)
    this.onCategoryRemove = this.onCategoryRemove.bind(this)
    this.onProviderList = this.onProviderList.bind(this)
    this.onProviderSave = this.onProviderSave.bind(this)
    this.onProviderRemove = this.onProviderRemove.bind(this)
    this.onProductList = this.onProductList.bind(this)
    this.onProductSave = this.onProductSave.bind(this)
    this.onProductRemove = this.onProductRemove.bind(this)
    this.onBatchSave = this.onBatchSave.bind(this)
    this.onBatchRemove = this.onBatchRemove.bind(this)
  }

  async componentDidMount(): Promise<void> {
    if (this.state.connected) {
      await this.onCategoryList()
      await this.onProviderList()
      await this.onProductList()
    }
  }

  onRoute(route: string): void {
  }

  async onLogin(login: Login): Promise<void> {
  }

  async onCategoryList(): Promise<void> {
    this.setState({ categories: await this.props.categoriesApi.list() })
  }

  async onCategorySave(id: number, category: CategorySave): Promise<void> {
    if (id === 0) {
      const result = await this.props.categoriesApi.add(category)
      if (result !== null) {
        let c = this.state.categories
        c.push(result)
        this.setState({ categories: c })
      }
    } else {
      const result = await this.props.categoriesApi.update(id, category)
      if (result !== null) {
        let c = this.state.categories
        let index = c.findIndex(x => x.id === id)
        c[index] = result
        this.setState({ categories: c })
      }
    }
  }

  async onCategoryRemove(id: number): Promise<void> {
    await this.props.categoriesApi.remove(id)
    let c = this.state.categories
    let index = c.findIndex(x => x.id === id)
    c.splice(index, 1);
    this.setState({ categories: c })
  }

  async onProviderList(): Promise<void> {
    this.setState({ providers: await this.props.providersApi.list() })
  }

  async onProviderSave(id: number, provider: ProviderSave): Promise<void> {
    if (id === 0) {
      const result = await this.props.providersApi.add(provider)
      if (result !== null) {
        let c = this.state.providers
        c.push(result)
        this.setState({ providers: c })
      }
    } else {
      const result = await this.props.providersApi.update(id, provider)
      if (result !== null) {
        let c = this.state.providers
        let index = c.findIndex(x => x.id === id)
        c[index] = result
        this.setState({ providers: c })
      }
    }
  }

  async onProviderRemove(id: number): Promise<void> {
  }

  async onProductList(): Promise<void> {
    this.setState({ products: await this.props.productsApi.list() })
  }

  async onProductSave(id: number, product: ProductSave): Promise<void> {
    if (id === 0) {
      const result = await this.props.productsApi.add(product)
      if (result !== null) {
        let c = this.state.products
        c.push(result)
        this.setState({ products: c })
      }
    }
  }

  async onProductRemove(id: number): Promise<void> {
  }

  async onBatchSave(productId: number, id: number, batch: BatchSave): Promise<void> {
    if (id === 0) {
      const result = await this.props.productsApi.addBatch(productId, batch)
      if (result !== null) {
        let index = this.state.products.findIndex(x => x.id === productId)
        if(index  > 0) {
          this.state.products[index].batches.push(result)
        }
      }
    }
  }

  async onBatchRemove(productId: number, id: number): Promise<void> {
  }

  render(): JSX.Element {
    return (
      <div className="App">
        {(() => {
          if (this.state.connected) {
            switch (this.state.currentView) {
              case 'products':
                return <>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Menu onRoute={this.onRoute} />
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Categories list={this.state.categories} onSave={this.onCategorySave} onRemove={this.onCategoryRemove} />
                        </Grid>
                        <Grid item xs={12}>
                          <Providers list={this.state.providers} onSave={this.onProviderSave} onRemove={this.onProviderRemove} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={10}>
                      <Products list={this.state.products} categories={this.state.categories} providers={this.state.providers} onSave={this.onProductSave} onRemove={this.onProductRemove} onBatchSave={this.onBatchSave} onBatchRemove={this.onBatchRemove} />
                    </Grid>
                  </Grid>
                </>
              default:
                return null;
            }
          } else {
            return <LoginView onLogin={this.onLogin} />
          }
        })()}
      </div>
    )
  }
}
