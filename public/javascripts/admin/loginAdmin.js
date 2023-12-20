document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const formData = new FormData(form)
        const response = await fetch('/loginAdmin', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const data = await response.json()
        if (data.success) {
            Swal.fire({
                icon: "success",
                text: data.message,
            });
            setTimeout(() => {
                window.location.href = '/homeAdmin'
            }, 1500);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message
            });
        }
    })
})