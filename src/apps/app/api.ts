import { Login, Authentication } from '../login/models'
import { Category, CategoryAdd } from '../categories/models'
import { Provider, ProviderAdd } from '../providers/models'
import { Product } from '../products/models'

class Api {
    uri: string = process.env.REACT_APP_API_URI!

    async get(resource: string, queries: any = {}): Promise<any> {
        const user = JSON.parse(localStorage.getItem('user')!)
        let headers = new Headers({
            'Authorization': `Token ${user.token}`,
            "Accept": "application/json"
        });

        let url = new URL(`${this.uri}/${resource}/`)
        Object.keys(queries).forEach(key => url.searchParams.append(key, queries[key]))

        const response = await fetch(url.toString(), { method: 'GET', headers: headers })
        return await response.json()
    }

    async post(resource: string, body: any, authentication: boolean = true): Promise<any> {
        let headers;
        if (authentication) {
            const user = JSON.parse(localStorage.getItem('user')!)
            headers = new Headers({
                'Authorization': `Token ${user.token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            });
        } else {
            headers = new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            });
        }

        const response = await fetch(`${this.uri}/${resource}/`, { method: 'POST', headers: headers, body: JSON.stringify(body) })
        if (response.status === 200 || response.status === 201) {
            return await response.json()    
        } else {
            return null
        }
    }
}

export class LoginApi extends Api {
    async authenticate(login: Login): Promise<Authentication> {
        return await this.post('authentication/login', login, false)
    }
}
export class CategoriesApi extends Api {
    async list(): Promise<Category[]> {
        return await this.get('categories')
    }

    async add(category: CategoryAdd): Promise<Category[]> {
        return await this.post('categories', category)
    }
}

export class ProvidersApi extends Api {
    async list(): Promise<Provider[]> {
        return await this.get('providers')
    }

    async add(provider: ProviderAdd): Promise<Provider[]> {
        return await this.post('providers', provider)
    }
}

export class ProductsApi extends Api {
    async list(): Promise<Product[]> {
        return await this.get('products')
    }
}