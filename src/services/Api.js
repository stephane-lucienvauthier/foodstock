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