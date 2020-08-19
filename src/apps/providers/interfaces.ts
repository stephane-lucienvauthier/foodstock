import { CoreMainProps, CoreMainState, CoreListProps, CoreSaveProps, CoreSaveState, CoreRemoveProps } from '../core/interfaces'
import { Provider, ProviderSave } from './models';

export interface MainProps extends CoreMainProps<number, ProviderSave, Provider> {}
export interface MainState extends CoreMainState<Provider> {
    isUpdate: boolean
}
export interface ListProps extends CoreListProps<Provider> {}
export interface SaveProps extends CoreSaveProps<ProviderSave, Provider> {
    open: boolean
}
export interface SaveState extends CoreSaveState<ProviderSave> {}
export interface RemoveProps extends CoreRemoveProps {
    open: boolean
}
