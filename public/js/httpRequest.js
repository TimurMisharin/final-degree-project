const fetchHttpRequest = (method, url, data) => {
    return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: data ? {
            'Content-Type': 'application/json'
        } : {}
    }).then(response => {
        if (response.status >= 400) {
            return response.json().then(errResData => {
                const error = new Error('Ops! Somtheing went wrong!')
                error.data = errResData.error
                throw error;
            })
        }
        return response.json()
    })
}