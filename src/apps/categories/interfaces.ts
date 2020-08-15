import { Category, CategoryAdd } from './models'

export interface CategoryListProps {
    categories: Category[]
}

export interface CategoryListState { }

export interface CategoryAddFormProps {
    open: boolean
    onAdd(category: CategoryAdd): void
    onCancel(): void
}

export interface CategoryAddFormState {
    category: CategoryAdd
}

export interface CategoriesProps {
    categories: Category[]
    onAdd(category: CategoryAdd): void
}

export interface CategoriesState {
    open: boolean
 }
