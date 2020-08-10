export default interface Batch {
    id: number,
    initial: number,
    current: number,
    price: number,
    purchase: Date,
    limit: Date,
    provider: string
}
