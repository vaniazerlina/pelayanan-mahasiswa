document.addEventListener('DOMContentLoaded', async function () {
    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const nim = document.getElementById('nim').value
        const password = document.getElementById('password').value

        const formData = new FormData(form)
        const response = await fetch('/loginMahasiswa', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nim,
                password
            })
        })
        const data = await response.json()
        if (data.success) {
            Swal.fire({
                icon: "success",
                text: data.message,
            });
            setTimeout(() => {
                window.location.href = '/homeMahasiswa'
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