import { Product, ProductAdd } from './models'
import { Category } from '../categories/models'

export interface ProductsProps {
    products: Product[]
    categories: Category[]
    onAdd(product: ProductAdd): void
}

export interface ProductsState {
    open: boolean
 }

export interface ProductListProps {
    products: Product[]
}

export interface ProductListState {}

export interface ProductListRowProps {
    product: Product
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