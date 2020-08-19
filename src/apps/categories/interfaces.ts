import { CoreMainProps, CoreMainState, CoreListProps, CoreSaveProps, CoreSaveState, CoreRemoveProps } from '../core/interfaces'
import { Category, CategorySave } from './models';

export interface MainProps extends CoreMainProps<number, CategorySave, Category> {}
export interface MainState extends CoreMainState<Category> {
    isUpdate: boolean
}
export interface ListProps extends CoreListProps<Category> {}
export interface SaveProps extends CoreSaveProps<CategorySave, Category> {
    open: boolean
}
export interface SaveState extends CoreSaveState<CategorySave> {}
export interface RemoveProps extends CoreRemoveProps {
    open: boolean
}
