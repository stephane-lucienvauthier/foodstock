export interface Provider {
    id: number,
    label: string,
    city: string
}

export interface ProviderSave {
    label: string,
    address: string,
    city: string,
    zipcode: string,
    phone: string
}
