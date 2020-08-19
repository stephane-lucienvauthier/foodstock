import { CoreMainProps, CoreMainState, CoreListProps, CoreSaveProps, CoreSaveState, CoreRemoveProps } from '../core/interfaces'
import { Product, ProductSave, Batch, BatchSave } from './models'
import { Category } from '../categories/models'
import { Provider } from '../providers/models'

export interface MainProps extends CoreMainProps<number, ProductSave, Product> {
    categories: Category[]
    providers: Provider[]
    onBatchSave(productId: number, id: number, batch: BatchSave): Promise<void>
    onBatchRemove(productId: number, id: number): Promise<void>
}
export interface MainState extends CoreMainState<Product> {
    isUpdate: boolean
    isBatchUpdate: boolean
    showBatchSaveForm: boolean
    currentBatch?: Batch
}
export interface ListProps extends CoreListProps<Product> {
    onShowBatchSaveForm(product: Product): void
}
export interface ListRowProps {
    product: Product
    onShowBatchSaveForm(product: Product): void
}
export interface ListRowState {
    open: boolean
}
export interface SaveProps extends CoreSaveProps<ProductSave, Product> {
    open: boolean
    categories: Category[]
}
export interface SaveState extends CoreSaveState<ProductSave> {}
export interface RemoveProps extends CoreRemoveProps {
    open: boolean
}
export interface BatchSaveProps extends CoreSaveProps<BatchSave, Batch> {
    open: boolean
    providers: Provider[]
    unit: string
}
export interface BatchSaveState extends CoreSaveState<BatchSave> {}
