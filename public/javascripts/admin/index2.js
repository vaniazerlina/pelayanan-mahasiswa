document.addEventListener('DOMContentLoaded', async () => {
    const username_admin = document.getElementById('username_admin')
    const dataProfile = await fetch('/profileAdmin', {
        method: 'GET'
    })
    const data = await dataProfile.json()
    if (data.success) {
        username_admin.textContent = `${data.data.username}`
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
})