export interface CoreMainProps<T, U, V> {
    list: V[]
    onSave(id: T, obj: U): Promise<void>
    onRemove(id: T): Promise<void>
}

export interface CoreMainState<T> {
    current?: T
    showSaveForm: boolean
    showRemoveForm: boolean
}

export interface CoreListProps<T> {
    list: T[]
    onShowSaveForm(obj?: T): Promise<void>
    onShowRemoveForm(obj: T): Promise<void>
}

export interface CoreSaveProps<T, U> {
    obj?: U
    isUpdate: boolean
    onSave(obj: T): void
    onCancelSave(): void
}

export interface CoreSaveState<T> {
    obj?: T
}

export interface CoreRemoveProps {
    onRemove(): void
    onCancelRemove(): void
}

export interface SaveInterface<T> {
    onSave(obj: T): void
    onCancelSave(): void
}

export interface RemoveInterface {
    onRemove(): void
    onCancelRemove(): void
}

export interface ShowDialogInterface<T> {
    onShowSaveForm(obj?: T): void
    onShowRemoveForm(obj: T): void
}

export interface ApiInterface<T, U, V> {
    details(id: T): Promise<U>
    list(): Promise<U[]>
    add(obj: V): Promise<U>
    update(id: T, obj: V): Promise<U>
    remove(id: T): Promise<void>
}

