import { Login, Authentication } from '../accounts/models'
import { Category, CategorySave } from '../categories/models'
import { Provider, ProviderSave } from '../providers/models'
import { Product, ProductSave, Batch, BatchSave } from '../products/models'
import { ApiInterface} from './interfaces'

class Api {
    uri: string = process.env.REACT_APP_API_URI!

    setUrl(resource: string, queries: any = {}): string {
        if (!resource.includes('/')) {
            resource = `${resource}/`
        }

        let url = new URL(`${this.uri}/${resource}`)
        Object.keys(queries).forEach(key => url.searchParams.append(key, queries[key]))
        return url.toString()
    }

    setHeaders(authentication: boolean, hasContent: boolean, returnContent: boolean): Headers {
        let headers = new Headers()
        if (authentication) {
            const user = JSON.parse(localStorage.getItem('user')!)
            headers.append('Authorization', `Token ${user.token}`)
        }

        if (hasContent) {
            headers.append('Content-Type', 'application/json')
        }
        
        if (returnContent) {
            headers.append('Accept', 'application/json')
        }
        return headers
    }

    async get(resource: string, queries: any = {}, authentication: boolean = true): Promise<any> {
        const response = await fetch(this.setUrl(resource, queries), { method: 'GET', headers: this.setHeaders(authentication, false, true) })
        if (response.status === 200) {
            return await response.json()    
        } else {
            return null
        }
    }

    async post(resource: string, body: any, authentication: boolean = true): Promise<any> {
        const response = await fetch(this.setUrl(resource), { method: 'POST', headers: this.setHeaders(authentication, true, true), body: JSON.stringify(body) })
        if (response.status === 200 || response.status === 201) {
            return await response.json()    
        } else {
            return null
        }
    }

    async put(resource: string, body:any, authentication: boolean = true): Promise<any> {
        const response = await fetch(this.setUrl(resource), { method: 'PUT', headers: this.setHeaders(authentication, true, true), body: JSON.stringify(body) })
        if (response.status === 200) {
            return await response.json()    
        } else {
            return null
        }
    }

    async delete(resource: string, authentication: boolean = true): Promise<any> {
        const response = await fetch(this.setUrl(resource), { method: 'DELETE', headers: this.setHeaders(authentication, false, false) })
        if (response.status !== 204) {
            return null    
        }
    }
}

export class AccountsApi extends Api {}

export class CategoriesApi extends Api implements ApiInterface<number, Category, CategorySave> {
    async details(id: number): Promise<Category> {
        throw new Error("Method not implemented.")
    }
    
    async list(): Promise<Category[]> {
        return await this.get('categories')
    }

    async add(obj: CategorySave): Promise<Category> {
        return await this.post('categories', obj)
    }

    async update(id: number, obj: CategorySave): Promise<Category> {
        return await this.put(`categories/${id}`, obj)
    }

    async remove(id: number): Promise<void> {
        await this.delete(`categories/${id}`)
    }
}

export class ProvidersApi extends Api implements ApiInterface<number, Provider, ProviderSave> {
    async details(id: number): Promise<Provider> {
        throw new Error("Method not implemented.")
    }

    async list(): Promise<Provider[]> {
        return await this.get('providers')
    }

    async add(obj: ProviderSave): Promise<Provider> {
        return await this.post('providers', obj)
    }

    async update(id: number, obj: ProviderSave): Promise<Provider> {
        return await this.put(`providers/${id}`, obj)
    }

    async remove(id: number): Promise<void> {
        throw new Error("Method not implemented.")
    }
}

export class ProductsApi extends Api implements ApiInterface<number, Product, ProductSave> {
    async details(id: number): Promise<Product> {
        throw new Error("Method not implemented.")
    }

    async list(): Promise<Product[]> {
        return await this.get('products')
    }

    async add(obj: ProductSave): Promise<Product> {
        return await this.post('products', obj)
    }

    async update(id: number, obj: ProductSave): Promise<Product> {
        throw new Error("Method not implemented.")
    }
    
    async remove(id: number): Promise<void> {
        throw new Error("Method not implemented.")
    }

    async addBatch(productId: number, obj: BatchSave): Promise<Batch> {
        return await this.post(`products/${productId}/batches/`, {
            initial: obj.initial,
            current: obj.current,
            price: obj.price,
            purchase: obj.purchase.toISOString().split('T')[0],
            limit: obj.limit.toISOString().split('T')[0],
            provider: obj.provider
        })
    }
}
