import { Category } from '../categories/models'
import { Provider } from '../providers/models'
import { Product } from '../products/models'
import { CategoriesApi, ProvidersApi, ProductsApi, AccountsApi } from '../core/apis'

export interface MainProps {
  categoriesApi: CategoriesApi
  providersApi: ProvidersApi
  productsApi: ProductsApi
  accountsApi: AccountsApi 
 }
export interface MainState {
  connected: boolean
  currentView: string
  categories: Category[]
  providers: Provider[]
  products: Product[]
}

export interface MenuProps { 
  onRoute(route: string): void
}
