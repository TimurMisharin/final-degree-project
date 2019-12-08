const registerForm = document.querySelector('form')

registerForm.addEventListener('submit', () => {
    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const password = document.getElementById('password').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    const data = {
        "first_name": fname,
        "last_name": lname,
        "password": password,
        "phone": phone,
        "email": email,
        "target_name": "Grandmo"
    }
    const response = fetchHttpRequest('POST', 'localhost:3000/users', data)
    console.log(response)
})