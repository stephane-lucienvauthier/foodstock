import { Product } from './models'

export interface ProductsProps {
    products: Product[]
}

export interface ProductsState { }

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