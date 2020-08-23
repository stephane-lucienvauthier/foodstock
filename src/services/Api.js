export async function LoginApi(username, password) {
    const uri = process.env.REACT_APP_API_URI
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/authentication/login/`, { method: 'POST', headers: headers, body: JSON.stringify({username, password}) })
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function CategoryListApi() {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/categories/`, { method: 'GET', headers: headers })
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function CategoryAddApi(category) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    const result = await fetch(`${uri}/categories/`, { method: 'POST', headers: headers, body: JSON.stringify(category) })
    if(result.status === 201) {
        return await result.json()
    }
    return false
}

export async function CategoryUpdateApi(id, category) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/categories/${id}`, { method: 'PUT', headers: headers, body: JSON.stringify(category) })
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function ProviderListApi() {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/providers/`, { method: 'GET', headers: headers })
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function ProviderGetApi(id) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/providers/${id}`, { method: 'GET', headers: headers })
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function ProviderAddApi(provider) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/providers/`, { method: 'POST', headers: headers, body: JSON.stringify(provider) })
    if(result.status === 201) {
        return await result.json()
    }
    return false
}

export async function ProviderUpdateApi(id, provider) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/providers/${id}`, { method: 'PUT', headers: headers, body: JSON.stringify(provider) })
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function ProductListApi() {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/products/`, { method: 'GET', headers: headers })
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function ProductAddApi(product) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/products/`, { method: 'POST', headers: headers, body: JSON.stringify(product) })
    if(result.status === 201) {
        return await result.json()
    }
    return false
}

export async function ProductUpdateApi(id, product) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/products/${id}`, { method: 'PUT', headers: headers, body: JSON.stringify(product) })
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function BatchAddApi(id, batch) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const result = await fetch(`${uri}/products/${id}/batches/`, { method: 'POST', headers: headers, body: JSON.stringify({
        initial: batch.initial,
        current: batch.current,
        price: batch.price,
        purchase: batch.purchase.toISOString().split('T')[0],
        limit: batch.limit.toISOString().split('T')[0],
        provider: batch.provider
    })})
    if(result.status === 201) {
        return await result.json()
    }
    return false
}

export async function BatchUpdateApi(productId, id, batch) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    console.log(batch)

    const result = await fetch(`${uri}/products/${productId}/batches/${id}`, { method: 'PUT', headers: headers, body: JSON.stringify({
        initial: batch.initial,
        current: batch.current,
        price: batch.price,
        purchase: batch.purchase.toISOString().split('T')[0],
        limit: batch.limit.toISOString().split('T')[0],
        provider: batch.provider
    })})
    if(result.status === 200) {
        return await result.json()
    }
    return false
}

export async function CategoryDeleteApi(id) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`
    }

    const result = await fetch(`${uri}/categories/${id}`, { method: 'DELETE', headers: headers })
    if(result.status === 204) {
        return true
    }
    return false
}

export async function ProviderDeleteApi(id) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`
    }

    const result = await fetch(`${uri}/providers/${id}`, { method: 'DELETE', headers: headers })
    if(result.status === 204) {
        return true
    }
    return false
}

export async function ProductDeleteApi(id) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`
    }

    const result = await fetch(`${uri}/products/${id}`, { method: 'DELETE', headers: headers })
    if(result.status === 204) {
        return true
    }
    return false
}

export async function BatchDeleteApi(productId, id) {
    const uri = process.env.REACT_APP_API_URI
    const user = JSON.parse(localStorage.getItem('user'))
    const headers = {
        'Authorization': `Token ${user.token}`
    }

    const result = await fetch(`${uri}/products/${productId}/batches/${id}`, { method: 'DELETE', headers: headers })
    if(result.status === 204) {
        return true
    }
    return false
}