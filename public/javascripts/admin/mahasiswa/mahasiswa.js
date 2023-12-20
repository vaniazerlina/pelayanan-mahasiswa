document.addEventListener('DOMContentLoaded', async () => {
    const responseMahasiswa = await fetch('/AllDataMahasiswaAdmin', {
        method: 'GET'
    })
    const dataResp = await responseMahasiswa.json()
    let mhs = {}
    if (dataResp.success) {
        mhs = dataResp.data
    } else {
        Swal.fire({
            icon: "error",
            text: 'Data mahasiswa belum tersedia'
        });
    }
    const tabelDataMahasiswa = document.getElementById('tabelDataMahasiswa')
    for (let index = 0; index < mhs.length; index++) {
        const tr = document.createElement('tr')
        tabelDataMahasiswa.appendChild(tr)
        tr.classList.add('data-mahasiswa')
    }

    const dataMahasiswa = document.getElementsByClassName('data-mahasiswa')
    for (let index = 0; index < dataMahasiswa.length; index++) {
        const th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = index + 1

        const td1 = document.createElement('td')
        td1.textContent = `${mhs[index].nim}`

        const td2 = document.createElement('td')
        td2.textContent = `${mhs[index].nama_mahasiswa}`

        const td3 = document.createElement('td')
        td3.textContent = `${mhs[index].departemen}`

        const td4 = document.createElement('td')
        td4.textContent = `${mhs[index].no_hp}`

        const td5 = document.createElement('td')

        const div1 = document.createElement('div')

        const div2 = document.createElement('div')
        div2.classList.add('row')

        const div3 = document.createElement('div')
        div3.classList.add('col-2', 'text-center')

        const buttonEdit = document.createElement('button')
        buttonEdit.setAttribute('type', 'button')
        buttonEdit.setAttribute('data-bs-toggle', "modal")
        buttonEdit.setAttribute('data-bs-target', "#exampleModal2")
        buttonEdit.setAttribute('data-bs-whatever', "@mdo")
        buttonEdit.textContent = 'Edit'
        buttonEdit.classList.add('btn', 'btn-warning')

        const div5 = document.createElement('div')
        div5.classList.add('modal', 'fade', 'text-start')
        div5.setAttribute('id', "exampleModal2")
        div5.setAttribute('tabindex', "-1")
        div5.setAttribute('aria-labelledby', "exampleModalLabel")
        div5.setAttribute('aria-hidden', "true")

        const div6 = document.createElement('div')
        div6.classList.add('modal-dialog')

        const div7 = document.createElement('div')
        div7.classList.add('modal-content')

        const div8 = document.createElement('div')
        div8.classList.add('modal-header')

        const textEdit = document.createElement('h1')
        textEdit.classList.add('modal-title', 'fs-5')
        textEdit.textContent = `Edit Data Mahasiswa`
        textEdit.setAttribute('id', "exampleModalLabel")


        const btnClose = document.createElement('button')
        btnClose.setAttribute('type', 'button')
        btnClose.setAttribute('data-bs-dismiss', "modal")
        btnClose.setAttribute('aria-label', "Close")
        btnClose.classList.add('btn-close')

        const div9 = document.createElement('div')
        div9.classList.add('modal-body')


        const form = document.createElement('form')

        const div11 = document.createElement('div')
        div11.classList.add('mb-3')

        const labelNimMhs = document.createElement('label')
        labelNimMhs.setAttribute('for', "nim-mahasiswa")
        labelNimMhs.classList.add('col-form-label')
        labelNimMhs.textContent = 'NIM Mahasiswa:'

        const inputNimMhs = document.createElement('input')
        inputNimMhs.setAttribute('type', "number")
        inputNimMhs.classList.add('form-control', 'nim-mahasiswa')
        inputNimMhs.disabled = true
        inputNimMhs.setAttribute('placeholder', `${mhs[index].nim}`)
        inputNimMhs.disabled = true


        const div12 = document.createElement('div')
        div12.classList.add('mb-3')

        const labelNamaMhs = document.createElement('label')
        labelNamaMhs.setAttribute('for', "nama-mahasiswa")
        labelNamaMhs.classList.add('col-form-label')
        labelNamaMhs.textContent = 'Nama Mahasiswa:'

        const inputNamaMhs = document.createElement('input')
        inputNamaMhs.setAttribute('type', "text")
        inputNamaMhs.classList.add('form-control', "nama-mahasiswa")
        inputNamaMhs.setAttribute('placeholder', `${mhs[index].nama_mahasiswa}`)

        const div13 = document.createElement('div')
        div13.classList.add('mb-3')

        const labelNoHpMhs = document.createElement('label')
        labelNoHpMhs.setAttribute('for', "no-hp")
        labelNoHpMhs.classList.add('col-form-label')
        labelNoHpMhs.textContent = 'No Hp'

        const inputNoHpMhs = document.createElement('input')
        inputNoHpMhs.setAttribute('type', "number")
        inputNoHpMhs.classList.add('form-control', "no-hp")
        inputNoHpMhs.setAttribute('placeholder', `${mhs[index].no_hp}`)

        const div14 = document.createElement('div')
        div14.classList.add('mb-3')

        const labelPassMhs = document.createElement('label')
        labelPassMhs.setAttribute('for', "password")
        labelPassMhs.classList.add('col-form-label')
        labelPassMhs.textContent = 'Password'

        const inputPassMhs = document.createElement('input')
        inputPassMhs.setAttribute('type', "password")
        inputPassMhs.classList.add('form-control', "password")

        const div10 = document.createElement('div')
        div10.classList.add('modal-footer')

        const btneditclose = document.createElement('button')
        btneditclose.setAttribute('type', 'button')
        btneditclose.classList.add('btn', 'btn-secondary')
        btneditclose.setAttribute('data-bs-dismiss', "modal")
        btneditclose.textContent = 'Close'

        const btnEdit = document.createElement('button')
        btnEdit.setAttribute('type', 'button')
        btnEdit.classList.add('btn', 'btn-success', 'btnEditForm')
        btnEdit.textContent = 'Edit'
        btnEdit.setAttribute('form', 'formEdit')


        const div4 = document.createElement('div')
        div4.classList.add('col-2')

        const buttonDelete = document.createElement('button')
        buttonDelete.setAttribute('type', 'button')
        buttonDelete.classList.add('btn', 'btn-danger')
        buttonDelete.textContent = 'Delete'

        dataMahasiswa[index].appendChild(th)
        dataMahasiswa[index].appendChild(td1)
        dataMahasiswa[index].appendChild(td2)
        dataMahasiswa[index].appendChild(td3)
        dataMahasiswa[index].appendChild(td4)
        dataMahasiswa[index].appendChild(td5)
        td5.appendChild(div1)
        div1.appendChild(div2)
        div2.appendChild(div3)
        div3.appendChild(buttonEdit)
        div3.appendChild(div5)
        div5.appendChild(div6)
        div6.appendChild(div7)
        div7.appendChild(div8)
        div8.appendChild(textEdit)
        div8.appendChild(btnClose)

        div7.appendChild(div9)
        div9.appendChild(form)
        form.appendChild(div11)
        div11.appendChild(labelNimMhs)
        div11.appendChild(inputNimMhs)

        form.appendChild(div12)
        div12.appendChild(labelNamaMhs)
        div12.appendChild(inputNamaMhs)

        form.appendChild(div13)
        div13.appendChild(labelNoHpMhs)
        div13.appendChild(inputNoHpMhs)

        form.appendChild(div14)
        div14.appendChild(labelPassMhs)
        div14.appendChild(inputPassMhs)

        div7.appendChild(div10)
        div10.appendChild(btneditclose)
        div10.appendChild(btnEdit)

        div2.appendChild(div4)
        div4.appendChild(buttonDelete)

        btnEdit.addEventListener('click', async () => {
            const nama_mahasiswa = document.getElementsByClassName('nama-mahasiswa')[index].value
            const no_hp = document.getElementsByClassName('no-hp')[index].value
            const password = document.getElementsByClassName('password')[index].value

            const responseEdit = await fetch(`/editDataMahasiswa/${mhs[index].nim}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    nama_mahasiswa: nama_mahasiswa,
                    no_hp: no_hp,
                    password: password
                })
            })
            const dataEdit = await responseEdit.json()
            if (dataEdit.success) {
                Swal.fire({
                    icon: "success",
                    text: dataEdit.message,
                });
                setTimeout(() => {
                    window.location.href = '/mahasiswaViews'
                }, 1500);
            } else {
                Swal.fire({
                    icon: "error",
                    text: dataEdit.message
                });
            }

        })

        buttonDelete.addEventListener('click', async () => {
            Swal.fire({
                title: "Apakah anda yakin ingin menghapus data mahasiswa ini?",
                showDenyButton: true,
                confirmButtonText: "delete",
                denyButtonText: `cancel`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const responseDelete = await fetch(`/deleteMahasiswa/${mhs[index].nim}`, {
                        method: 'DELETE'
                    })
                    const data = await responseDelete.json()
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            text: data.message,
                        });
                        setTimeout(() => {
                            window.location.href = '/mahasiswaViews'
                        }, 1500);
                    } else {
                        Swal.fire({
                            icon: "error",
                            text: data.message
                        });
                    }
                } else if (result.isDenied) {
                    console.log('batal')
                }
            });
        })
    }

    const btnTambah = document.getElementById('btn-tambah')
    btnTambah.addEventListener('click', async () => {
        Swal.fire({
            title: "Apakah data yang anda inputkan sudah benar? karena nim tidak akan dapat diubah",
            showDenyButton: true,
            confirmButtonText: "add",
            denyButtonText: `cancel`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const nim_mahasiswa = document.getElementById('nim_mahasiswa').value
                const nama_mahasiswa = document.getElementById('nama_mahasiswa').value
                const no_hp = document.getElementById('no_hp').value
                const password = document.getElementById('password').value

                const addResponse = await fetch('/addMahasiswa', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        nim: nim_mahasiswa,
                        nama_mahasiswa: nama_mahasiswa,
                        no_hp: no_hp,
                        password: password
                    })
                })
                const data = await addResponse.json()
                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        text: data.message,
                    });
                    setTimeout(() => {
                        window.location.href = '/mahasiswaViews'
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: "error",
                        text: data.message
                    });
                }
            } else if (result.isDenied) {
                console.log('batal')
            }
        });


    })
})