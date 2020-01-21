const getReports = (e) => {
    axios.get('/reports', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            const data = document.querySelector('#reportsMsgs')
            for (i in response.data) {
                const node = document.createElement('div')
                node.innerText = response.data[i].description
                data.appendChild(node)
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}