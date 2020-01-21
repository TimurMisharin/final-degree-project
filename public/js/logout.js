const logoutListener = document.querySelector('#logout')

if (logoutListener) {
    const logout = (e) => {
        e.preventDefault();
        axios.post('/users/logout', {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response)
                Cookies.remove('JWT')
                window.location.href = "/"
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    logoutListener.addEventListener('click', logout);
}