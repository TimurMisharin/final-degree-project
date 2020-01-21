const loginForm = document.querySelector('form')

const sendData = (e) => {
    e.preventDefault();
    const mail = document.getElementById('mail').value
    const password = document.getElementById('password').value
    const data = {
        email: mail,
        password: password
    }
    axios.post('/users/login', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        console.log(response)
        Cookies.set('JWT',`Bearer ${response.data.token}`)
        window.location.href="/home"
    })
    .catch(function (error) {
        console.log(error)
    })
}


loginForm.addEventListener('submit', sendData)