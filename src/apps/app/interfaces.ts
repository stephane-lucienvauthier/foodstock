import { Category } from '../categories/models'
import { Provider } from '../providers/models'
import { Product } from '../products/models'

export interface AppProps { }
export interface AppState {
  connected: boolean,
  categories: Category[],
  providers: Provider[],
  products: Product[],
  currentView: string
}