export interface Batch {
    id: number,
    initial: number,
    current: number,
    price: number,
    purchase: Date,
    limit: Date,
    provider: string
}

export interface Product {
    id: number,
    label: string,
    unit: string,
    category: string,
    icon: String,
    batches: Batch[]
}