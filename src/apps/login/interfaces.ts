import { Login } from './models'

export interface LoginProps {
    onlogin(login: Login): void
}

export interface LoginState {
    login: Login
}