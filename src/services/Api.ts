export default class Api {
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
        return await response.json()
    }
}