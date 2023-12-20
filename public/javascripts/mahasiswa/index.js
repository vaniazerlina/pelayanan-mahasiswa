document.addEventListener('DOMContentLoaded', async () => {
    const nim_mahasiswa = document.getElementById('nim_mahasiswa')
    const dataProfile = await fetch('/profileMahasiswa', {
        method: 'GET'
    })
    const data = await dataProfile.json()
    if (data.success) {
        nim_mahasiswa.textContent = `${data.data.nim}`
    } else {
        if (data.message == 'nim not found') {
            window.location.href = '/loginMahasiswa'
        } else {
            Swal.fire({
                icon: "error",
                text: data.message
            });
        }
    }
})