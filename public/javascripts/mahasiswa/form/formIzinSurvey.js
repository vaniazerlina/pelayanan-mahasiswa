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
            text: dataMahasiswa.message
        });
    }

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

    const inputAnggota6 = document.getElementById('inputAnggota6')
    for (let index = 0; index < data.length; index++) {
        const option = document.createElement('option')
        inputAnggota6.appendChild(option)
        option.classList.add('inputanggota6')
    }

    const inputanggota6 = document.getElementsByClassName('inputanggota6')
    for (let index = 0; index < inputanggota6.length; index++) {
        inputanggota6[index].setAttribute('value', data[index].nim)
        inputanggota6[index].textContent = `${data[index].nama_mahasiswa}`
    }


    const inputAnggota7 = document.getElementById('inputAnggota7')
    for (let index = 0; index < data.length; index++) {
        const option = document.createElement('option')
        inputAnggota7.appendChild(option)
        option.classList.add('inputanggota7')
    }

    const inputanggota7 = document.getElementsByClassName('inputanggota7')
    for (let index = 0; index < inputanggota7.length; index++) {
        inputanggota7[index].setAttribute('value', data[index].nim)
        inputanggota7[index].textContent = `${data[index].nama_mahasiswa}`
    }


    const inputAnggota8 = document.getElementById('inputAnggota8')
    for (let index = 0; index < data.length; index++) {
        const option = document.createElement('option')
        inputAnggota8.appendChild(option)
        option.classList.add('inputanggota8')
    }

    const inputanggota8 = document.getElementsByClassName('inputanggota8')
    for (let index = 0; index < inputanggota8.length; index++) {
        inputanggota8[index].setAttribute('value', data[index].nim)
        inputanggota8[index].textContent = `${data[index].nama_mahasiswa}`
    }

    const dataDosenResp = await fetch('/dataDosen', {
        method: 'GET'
    })
    const dataDosen = await dataDosenResp.json()
    let datadosen = {}
    if (dataDosen.success) {
        datadosen = dataDosen.data
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: dataDosen.message
        });
    }

    const dosen_pengampu = document.getElementById('dosen_pengampu')
    for (let index = 0; index < datadosen.length; index++) {
        const option = document.createElement('option')
        dosen_pengampu.appendChild(option)
        option.classList.add('dosen_pengampu')
    }

    const dosenPengampu = document.getElementsByClassName('dosen_pengampu')
    for (let index = 0; index < dosenPengampu.length; index++) {
        dosenPengampu[index].setAttribute('value', datadosen[index].nip_dosen)
        dosenPengampu[index].textContent = `${datadosen[index].nama_dosen}`

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
                const anggota6 = inputAnggota6.value
                const anggota7 = inputAnggota7.value
                const anggota8 = inputAnggota8.value
                const dosen_pengampu = document.getElementById('dosen_pengampu').value
                const mata_kuliah = document.getElementById('mata_kuliah').value
                const penerima_tujuan = document.getElementById('penerima_tujuan').value

                const formData = new FormData(form)
                const response = await fetch('/addIzinSurvey', {
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
                        nim_mahasiswa6: anggota6,
                        nim_mahasiswa7: anggota7,
                        nim_mahasiswa8: anggota8,
                        dosen_pengampu,
                        mata_kuliah,
                        penerima_tujuan
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