const Common = {}

Common.loginUrlMove = (error) => {
    alert('Your session has expired\nYou are redirected to the login page.')
    window.location.href = error.response.data.loginUrl
}

export default Common;