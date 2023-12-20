document.addEventListener('DOMContentLoaded', async () => {
    const username = document.getElementById('username')
    const name = document.getElementById('name')
    const niu = document.getElementById('niu')

    const dataProfile = await fetch('/profileAdmin', {
        method: 'GET'
    })
    const data = await dataProfile.json()
    if (data.success) {
        username.setAttribute('placeholder', `${data.data.username}`)
        name.setAttribute('placeholder', `${data.data.name}`)
        niu.setAttribute('placeholder', `${data.data.niu_admin}`)
    } else {
        if (data.message == 'admin not found') {
            window.location.href = '/loginAdmin'
        } else {
            Swal.fire({
                icon: "error",
                text: data.message
            });
        }
    }

    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault(event)

        const username = document.getElementById('username').value
        const name = document.getElementById('name').value
        const new_password = document.getElementById('new_password').value

        const updateProfile = await fetch('/updateProfileAdmin', {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({
                username: username,
                name: name,
                new_password: new_password
            })
        })
        const respUpdate = await updateProfile.json()
        if (respUpdate.success) {
            Swal.fire({
                icon: "success",
                text: respUpdate.message,
            });
            setTimeout(() => {
                window.location.href = '/profileAdminViews'
            }, 1500);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: respUpdate.message
            });
            setTimeout(() => {
                window.location.href = '/profileAdminViews'
            }, 1500);
        }
    })

    const btn_reset = document.getElementById('btn-reset')
    btn_reset.addEventListener('click', async () => {
        const form = document.querySelector('form')
        form.reset()
        window.location.href = '/profileAdminViews'
    })

})