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
