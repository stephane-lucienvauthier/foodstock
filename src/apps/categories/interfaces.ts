import { Category, CategoryAdd } from './models'

export interface CategoryListProps {
    categories: Category[]
    showUpdateForm(category: Category): void
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

export interface CategoryUpdateFormProps {
    open: boolean
    category: CategoryAdd
    onUpdate(category: CategoryAdd): void
    onCancel(): void
}

export interface CategoryUpdateFormState {
    category: CategoryAdd
}

export interface CategoriesProps {
    categories: Category[]
    onAdd(category: CategoryAdd): void
    onUpdate(categoryId: number, category: CategoryAdd): void
}

export interface CategoriesState {
    open: boolean
    openUpdateForm: boolean
    current?: Category
 }
