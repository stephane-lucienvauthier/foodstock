import { Product, ProductAdd, BatchAdd } from './models'
import { Category } from '../categories/models'
import { Provider } from '../providers/models'

export interface ProductsProps {
    products: Product[]
    categories: Category[]
    providers: Provider[]
    onAdd(product: ProductAdd): void
    onBatchAdd(productId: number, batch: BatchAdd): void
}

export interface ProductsState {
    open: boolean
    batchAddOpen: boolean
    current?: Product
}

export interface ProductListProps {
    products: Product[]
    showBatchAddForm(product: Product) :void
}

export interface ProductListState { }

export interface ProductListRowProps {
    product: Product
    showBatchAddForm(product: Product) :void
}

export interface ProductListRowState {
    open: boolean
}

export interface ProductAddFormProps {
    open: boolean
    categories: Category[]
    onAdd(product: ProductAdd): void
    onCancel(): void
}

export interface ProductAddFormState {
    product: ProductAdd
}

export interface BatchAddFormProps {
    open: boolean
    providers: Provider[]
    unit: string
    onAdd(batch: BatchAdd): void
    onCancel(): void
}

export interface BatchAddFormState {
    batch: BatchAdd
}