export interface Batch {
    id: number,
    initial: number,
    current: number,
    price: number,
    purchase: string,
    limit: string,
    provider: string
}

export interface BatchAdd {
    initial: number,
    current: number,
    price: number,
    purchase: Date,
    limit: Date,
    provider: number
}

export interface Product {
    id: number,
    label: string,
    unit: string,
    category: string,
    icon: String,
    batches: Batch[]
}

export interface ProductAdd {
    label: string,
    unit: string,
    category: number
}