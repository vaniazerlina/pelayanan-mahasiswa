document.addEventListener('DOMContentLoaded', async () => {
    const izinKpResp = await fetch('/allIzinKpAdmin', {
        method: 'GET'
    })
    const dataIzinKp = await izinKpResp.json()
    let izinKp = {}
    if (dataIzinKp.success) {
        izinKp = dataIzinKp.data
    } else {
        Swal.fire({
            icon: "error",
            text: dataResp.message
        });
    }

    const tabelDataIzinKp = document.getElementById('tabelDataIzinKp')
    for (let index = 0; index < izinKp.length; index++) {
        const tr = document.createElement('tr')
        tabelDataIzinKp.appendChild(tr)
        tr.classList.add('data-izin-kp')
    }

    const data_izin_kp = document.getElementsByClassName('data-izin-kp')
    for (let index = 0; index < data_izin_kp.length; index++) {
        const th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = index + 1

        const td1 = document.createElement('td')
        td1.textContent = `${izinKp[index].DataMahasiswa1.nama_mahasiswa}`
        td1.classList.add('col-1')
        const td2 = document.createElement('td')
        td2.textContent = 'Surat Izin Kerja Praktek'

        const td3 = document.createElement('td')
        const a = document.createElement('a')
        td3.classList.add('col-2')
        if (izinKp[index].file_izin_kp == null) {
            a.classList.add('text-decoration-none')
            a.textContent = '-'
        } else {
            a.setAttribute('href', `/docs/generate/izinKp/${izinKp[index].file_izin_kp}`)
            a.textContent = `${izinKp[index].file_izin_kp}`
        }


        const td4 = document.createElement('td')
        const created_at = izinKp[index].created_at
        const tgl = new Date(created_at)
        const namaBulan = [
            "Januari", "Februari", "Maret", "April",
            "Mei", "Juni", "Juli", "Agustus",
            "September", "Oktober", "November", "Desember"
        ];
        const tahun = tgl.getFullYear()
        const bulan = tgl.getMonth()
        const bln = namaBulan[bulan]
        const hari = ("0" + tgl.getDate()).slice(-2);
        td4.textContent = `${hari} ${bln} ${tahun}`

        const td5 = document.createElement('td')
        td5.classList.add('col-2')
        td5.textContent = `${izinKp[index].instansi_tujuan}`

        const td6 = document.createElement('td')
        const span = document.createElement('span')
        const status = izinKp[index].status
        if (status == 'diterima') {
            span.classList.add('badge', 'text-bg-success')
            span.textContent = `${status}`
        } else if (status == 'menunggu') {
            span.classList.add('badge', 'text-bg-primary')
            span.textContent = `${status}`
        } else {
            span.classList.add('badge', 'text-bg-danger')
            span.textContent = `${status}`
        }

        const td7 = document.createElement('td')

        //kalau sudah diterima
        const buttonVerifikasi = document.createElement('button')
        buttonVerifikasi.setAttribute('type', 'button')
        buttonVerifikasi.classList.add('btn', 'btn-outline-secondary', 'btn-sm')
        buttonVerifikasi.textContent = 'Verifikasi'

        //kalau belum diterima
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        div2.classList.add('row')

        const div3 = document.createElement('div')
        div3.classList.add('col-2')
        const imgAcc = document.createElement('img')
        imgAcc.setAttribute('src', '/images/check.png')
        imgAcc.classList.add('w-75')

        const div4 = document.createElement('div')
        div4.classList.add('col-2')
        const imgDel = document.createElement('img')
        imgDel.setAttribute('src', '/images/delete.png')
        imgDel.classList.add('w-75')

        const div5 = document.createElement('div')
        div5.classList.add('col-2')
        const a2 = document.createElement('a')
        a2.setAttribute('href', `/detailIzinKpViews/${izinKp[index].no_surat_izin_kp}`)
        const imgDetail = document.createElement('img')
        imgDetail.setAttribute('src', '/images/detail.png')
        imgDetail.classList.add('w-75')

        data_izin_kp[index].appendChild(th)
        data_izin_kp[index].appendChild(td1)
        data_izin_kp[index].appendChild(td2)
        data_izin_kp[index].appendChild(td3)
        td3.appendChild(a)
        data_izin_kp[index].appendChild(td4)
        data_izin_kp[index].appendChild(td5)
        data_izin_kp[index].appendChild(td6)
        td6.appendChild(span)
        data_izin_kp[index].appendChild(td7)
        if (status == 'diterima') {
            td7.appendChild(buttonVerifikasi)
        } else if (status == 'menunggu') {
            td7.appendChild(div1)
            div1.appendChild(div2)
            div2.appendChild(div3)
            div3.appendChild(imgAcc)
            div2.appendChild(div4)
            div4.appendChild(imgDel)
            div2.appendChild(div5)
            div5.appendChild(a2)
            a2.appendChild(imgDetail)
        } else {
            td7.textContent = '-'
        }

        imgAcc.addEventListener('click', async () => {
            Swal.fire({
                title: "Apakah anda yakin ingin menerima surat ini?",
                showDenyButton: true,
                confirmButtonText: "Ok",
                denyButtonText: `cancel`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const responseAcc = await fetch(`/accIzinKp/${izinKp[index].no_surat_izin_kp}`, {
                        method: 'GET'
                    })
                    const data = await responseAcc.json()
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            text: data.message,
                        });
                        setTimeout(() => {
                            window.location.href = '/riwayatIzinKpViews'
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

        imgDel.addEventListener('click', async () => {
            const {
                value: keterangan
            } = await Swal.fire({
                title: "Alasan Menolak Surat",
                input: "text",
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "Silahkan sertakan alasan anda menolak surat ini";
                    }
                }
            });
            if (keterangan) {
                const responseDel = await fetch(`/tolakSuratIzin/${izinKp[index].no_surat_izin_kp}`, {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        keterangan: keterangan
                    })
                })
                const data = await responseDel.json()
                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        text: data.message,
                    });
                    setTimeout(() => {
                        window.location.href = '/riwayatIzinKpViews'
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: "error",
                        text: data.message
                    });
                }
            } else {
                console.log('batal')
            }
        })

        buttonVerifikasi.addEventListener('click', async () => {
            const respGeneTugasKp = await fetch(`/generateTugasKp/${izinKp[index].no_surat_izin_kp}`, {
                method: 'GET'
            })
            const data = await respGeneTugasKp.json()
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    text: data.message,
                });
                setTimeout(() => {
                    window.location.href = '/riwayatIzinKpViews'
                }, 1500);
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
    }
})