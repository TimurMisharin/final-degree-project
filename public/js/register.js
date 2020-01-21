const registerForm = document.querySelector('form')

const sendData = (e) => {
    e.preventDefault();
    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const password = document.getElementById('password').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    const data = {
        first_name: fname,
        last_name: lname,
        password: password,
        phone: phone,
        email: email,
        target_name: 'Grandmo'
    }
    axios.post('/users', data, {
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

registerForm.addEventListener('submit', sendData)