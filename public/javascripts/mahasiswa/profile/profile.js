document.addEventListener('DOMContentLoaded', async () => {
    const nama_mahasiswa = document.getElementById('nama_mahasiswa')
    const nim = document.getElementById('nim')
    const departemen = document.getElementById('departemen')
    const no_hp = document.getElementById('no_hp')
    const password = document.getElementById('password')

    const dataProfile = await fetch('/profileMahasiswa', {
        method: 'GET'
    })
    const data = await dataProfile.json()
    if (data.success) {
        nama_mahasiswa.setAttribute('placeholder', `${data.data.nama_mahasiswa}`)
        nim.setAttribute('placeholder', `${data.data.nim}`)
        departemen.setAttribute('placeholder', `${data.data.departemen}`)
        no_hp.setAttribute('placeholder', `${data.data.no_hp}`)
        password.setAttribute('placeholder', `******`)
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

    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault(event)

        const nama_mahasiswa = document.getElementById('nama_mahasiswa').value
        const departemen = document.getElementById('departemen').value
        const no_hp = document.getElementById('no_hp').value
        const new_password = document.getElementById('new_password').value

        const updateProfile = await fetch('/updateProfileMahasiswa', {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({
                nama_mahasiswa: nama_mahasiswa,
                departemen: departemen,
                no_hp: no_hp,
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
                window.location.href = '/profileMhs'
            }, 1500);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: respUpdate.message
            });
            window.location.href = '/profileMhs'
        }
    })

    const btn_reset = document.getElementById('btn-reset')
    btn_reset.addEventListener('click', async () => {
        const form = document.querySelector('form')
        form.reset()
        window.location.href = '/profileMhs'
    })


})