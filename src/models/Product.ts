import Batch from './Batch'

export default interface Product {
    id: number,
    label: string,
    unit: string,
    category: string,
    icin: String,
    bacthes: Batch[]
}
