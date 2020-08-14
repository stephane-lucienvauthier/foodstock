export interface Provider {
    id: number,
    label: string,
    city: string
}

export interface ProviderAdd {
    label: string,
    address: string,
    city: string,
    zipcode: string,
    phone: string
}
