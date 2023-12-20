document.addEventListener('DOMContentLoaded', async function () {
    const respMahasiswa = await fetch('/dataMahasiswa', {
        method: 'GET'
    })
    const dataMahasiswa = await respMahasiswa.json()

    let data = {}
    if (dataMahasiswa.success) {
        data = dataMahasiswa.data
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message
        });
    }
    console.log(data)

    const inputAnggota1 = document.getElementById('inputAnggota1')
    for (let index = 0; index < data.length; index++) {
        const option = document.createElement('option')
        inputAnggota1.appendChild(option)
        option.classList.add('inputanggota1')
    }

    const inputanggota1 = document.getElementsByClassName('inputanggota1')
    for (let index = 0; index < inputanggota1.length; index++) {
        inputanggota1[index].setAttribute('value', data[index].nim)
        inputanggota1[index].textContent = `${data[index].nama_mahasiswa}`
    }

    const inputAnggota2 = document.getElementById('inputAnggota2')
    for (let index = 0; index < data.length; index++) {
        const option = document.createElement('option')
        inputAnggota2.appendChild(option)
        option.classList.add('inputanggota2')
    }

    const inputanggota2 = document.getElementsByClassName('inputanggota2')
    for (let index = 0; index < inputanggota2.length; index++) {
        inputanggota2[index].setAttribute('value', data[index].nim)
        inputanggota2[index].textContent = `${data[index].nama_mahasiswa}`
    }

    const inputAnggota3 = document.getElementById('inputAnggota3')
    for (let index = 0; index < data.length; index++) {
        const option = document.createElement('option')
        inputAnggota3.appendChild(option)
        option.classList.add('inputanggota3')
    }

    const inputanggota3 = document.getElementsByClassName('inputanggota3')
    for (let index = 0; index < inputanggota3.length; index++) {
        inputanggota3[index].setAttribute('value', data[index].nim)
        inputanggota3[index].textContent = `${data[index].nama_mahasiswa}`
    }

    const inputAnggota4 = document.getElementById('inputAnggota4')
    for (let index = 0; index < data.length; index++) {
        const option = document.createElement('option')
        inputAnggota4.appendChild(option)
        option.classList.add('inputanggota4')
    }

    const inputanggota4 = document.getElementsByClassName('inputanggota4')
    for (let index = 0; index < inputanggota4.length; index++) {
        inputanggota4[index].setAttribute('value', data[index].nim)
        inputanggota4[index].textContent = `${data[index].nama_mahasiswa}`
    }

    const inputAnggota5 = document.getElementById('inputAnggota5')
    for (let index = 0; index < data.length; index++) {
        const option = document.createElement('option')
        inputAnggota5.appendChild(option)
        option.classList.add('inputanggota5')
    }

    const inputanggota5 = document.getElementsByClassName('inputanggota5')
    for (let index = 0; index < inputanggota5.length; index++) {
        inputanggota5[index].setAttribute('value', data[index].nim)
        inputanggota5[index].textContent = `${data[index].nama_mahasiswa}`
    }



    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        Swal.fire({
            title: "Sudah yakin dengan data yang anda inputkan?",
            showDenyButton: true,
            confirmButtonText: "submit",
            denyButtonText: `cancel`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const anggota1 = inputAnggota1.value
                const anggota2 = inputAnggota2.value
                const anggota3 = inputAnggota3.value
                const anggota4 = inputAnggota4.value
                const anggota5 = inputAnggota5.value
                const penerima_surat = document.getElementById('penerima_surat').value
                const instansi_tujuan = document.getElementById('instansi_tujuan').value
                const tanggal_mulai_kp = document.getElementById('tanggal_mulai_kp').value
                const tanggal_selesai_kp = document.getElementById('tanggal_selesai_kp').value
                const departemen = document.getElementById('departemen').value

                const formData = new FormData(form)
                const response = await fetch('/addIzinKp', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nim_mahasiswa1: anggota1,
                        nim_mahasiswa2: anggota2,
                        nim_mahasiswa3: anggota3,
                        nim_mahasiswa4: anggota4,
                        nim_mahasiswa5: anggota5,
                        instansi_tujuan,
                        penerima_surat,
                        tanggal_mulai_kp,
                        tanggal_selesai_kp,
                        departemen
                    })
                })

                const data = await response.json()
                if (data.success) {
                    Swal.fire(`${data.message}`, "", "success");
                    setTimeout(() => {
                        window.location.href = '/riwayatMahasiswa'
                    }, 2000);
                } else {
                    Swal.fire(`${data.message}`, "", "info");
                }

            } else if (result.isDenied) {
                Swal.fire(`Silahkan cek kembali data inputan anda`, "", "info");
            }
        });





    })

    const btn_reset = document.getElementById('btn-reset')
    btn_reset.addEventListener('click', async () => {
        const form = document.querySelector('form')
        form.reset()
        window.location.href = '/formSurvey'
    })
})