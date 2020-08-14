export interface Login {
    username: string,
    password: string
}

export interface Authentication {
    email: string,
    permissions: string[],
    token: string,
    created: boolean
}
