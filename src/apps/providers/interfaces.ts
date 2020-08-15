import { Provider, ProviderAdd } from './models'

export interface ProviderListProps {
    providers: Provider[]
}

export interface ProviderListState { }

export interface ProviderAddFormProps {
    open: boolean
    onAdd(provider: ProviderAdd): void
    onCancel(): void
}

export interface ProviderAddFormState {
    provider: ProviderAdd
}

export interface ProvidersProps {
    providers: Provider[]
    onAdd(provider: ProviderAdd): void
}

export interface ProvidersState {
    open: boolean
 }
