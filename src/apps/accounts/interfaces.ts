import { Login } from './models'

export interface MainProps {
    onLogin(login: Login): Promise<void>
 }
export interface MainState { }