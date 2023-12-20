document.addEventListener('DOMContentLoaded', async () => {
    const responseDosen = await fetch('/dataDosenAdmin', {
        method: 'GET'
    })
    const dataResp = await responseDosen.json()
    let dataDosen = {}
    if (dataResp.success) {
        dataDosen = dataResp.data
    } else {
        Swal.fire({
            icon: "error",
            text: dataResp.message
        });
    }

    const tabelDataDosen = document.getElementById('tabelDataDosen')
    for (let index = 0; index < dataDosen.length; index++) {
        const tr = document.createElement('tr')
        tabelDataDosen.appendChild(tr)
        tr.classList.add('data-dosen')
    }

    const data_dosen = document.getElementsByClassName('data-dosen')
    for (let index = 0; index < data_dosen.length; index++) {
        const th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = index + 1

        const td1 = document.createElement('td')
        td1.textContent = `${dataDosen[index].nip_dosen}`

        const td2 = document.createElement('td')
        td2.textContent = `${dataDosen[index].nama_dosen}`

        const td3 = document.createElement('td')

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
        textEdit.textContent = `Edit Data Dosen`
        textEdit.setAttribute('id', "exampleModalLabel")


        const btnClose = document.createElement('button')
        btnClose.setAttribute('type', 'button')
        btnClose.setAttribute('data-bs-dismiss', "modal")
        btnClose.setAttribute('aria-label', "Close")
        btnClose.classList.add('btn-close')

        const div9 = document.createElement('div')
        div9.classList.add('modal-body')


        const form = document.createElement('form')
        form.setAttribute('id', 'formEdit')

        const div11 = document.createElement('div')
        div11.classList.add('mb-3')

        const labelNipDosen = document.createElement('label')
        labelNipDosen.setAttribute('for', "nip-dosen")
        labelNipDosen.classList.add('col-form-label')
        labelNipDosen.textContent = 'NIP Dosen:'

        const inputNipDosen = document.createElement('input')
        inputNipDosen.setAttribute('type', "text")
        inputNipDosen.classList.add('form-control', 'nip-dosen')
        inputNipDosen.disabled = true
        inputNipDosen.setAttribute('placeholder', `${dataDosen[index].nip_dosen}`)


        const div12 = document.createElement('div')
        div12.classList.add('mb-3')

        const labelNamaDosen = document.createElement('label')
        labelNamaDosen.setAttribute('for', "nama-dosen")
        labelNamaDosen.classList.add('col-form-label')
        labelNamaDosen.textContent = 'Nama Dosen:'

        const inputNamaDosen = document.createElement('input')
        inputNamaDosen.setAttribute('type', "text")
        inputNamaDosen.classList.add('form-control', "nama-dosen")
        inputNamaDosen.setAttribute('placeholder', `${dataDosen[index].nama_dosen}`)


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

        data_dosen[index].appendChild(th)
        data_dosen[index].appendChild(td1)
        data_dosen[index].appendChild(td2)
        data_dosen[index].appendChild(td3)
        td3.appendChild(div1)
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
        div11.appendChild(labelNipDosen)
        div11.appendChild(inputNipDosen)

        form.appendChild(div12)
        div12.appendChild(labelNamaDosen)
        div12.appendChild(inputNamaDosen)

        div7.appendChild(div10)
        div10.appendChild(btneditclose)
        div10.appendChild(btnEdit)

        div2.appendChild(div4)
        div4.appendChild(buttonDelete)

        btnEdit.addEventListener('click', async () => {
            const nama_dosen = document.getElementsByClassName('nama-dosen')[index].value

            const responseEdit = await fetch(`/editDataDosen/${dataDosen[index].nip_dosen}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    nama_dosen: nama_dosen
                })
            })
            const dataEdit = await responseEdit.json()
            if (dataEdit.success) {
                Swal.fire({
                    icon: "success",
                    text: dataEdit.message,
                });
                setTimeout(() => {
                    window.location.href = '/dosenViews'
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
                title: "Apakah anda yakin ingin menghapus data dosen ini?",
                showDenyButton: true,
                confirmButtonText: "delete",
                denyButtonText: `cancel`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const responseDelete = await fetch(`/deleteDataDosen/${dataDosen[index].nip_dosen}`, {
                        method: 'DELETE'
                    })
                    const data = await responseDelete.json()
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            text: data.message,
                        });
                        setTimeout(() => {
                            window.location.href = '/dosenViews'
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
            title: "Apakah data yang anda inputkan sudah benar? karena nip tidak akan dapat diubah",
            showDenyButton: true,
            confirmButtonText: "add",
            denyButtonText: `cancel`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const nip_dosen = document.getElementById('nip-dosen').value
                const nama_dosen = document.getElementById('nama-dosen').value

                const addResponse = await fetch('/addDataDosen', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        nip_dosen: nip_dosen,
                        nama_dosen: nama_dosen
                    })
                })
                const data = await addResponse.json()
                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        text: data.message,
                    });
                    setTimeout(() => {
                        window.location.href = '/dosenViews'
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