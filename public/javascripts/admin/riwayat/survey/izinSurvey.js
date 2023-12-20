document.addEventListener('DOMContentLoaded', async () => {
    const izinSurveyResp = await fetch('/allIzinSurveyAdmin', {
        method: 'GET'
    })
    const dataIzinResp = await izinSurveyResp.json()
    let izinSurvey = {}
    if (dataIzinResp.success) {
        izinSurvey = dataIzinResp.data
    } else {
        Swal.fire({
            icon: "error",
            text: dataIzinResp.message
        });
    }

    const tabelIzinSurvey = document.getElementById('tabelIzinSurvey')
    for (let index = 0; index < izinSurvey.length; index++) {
        const tr = document.createElement('tr')
        tabelIzinSurvey.appendChild(tr)
        tr.classList.add('data-izin-survey')
    }

    const dataIzinSurvey = document.getElementsByClassName('data-izin-survey')
    for (let index = 0; index < dataIzinSurvey.length; index++) {
        const th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = index + 1

        const td1 = document.createElement('td')
        td1.textContent = `${izinSurvey[index].DataMahasiswa1.nama_mahasiswa}`
        td1.classList.add('col-1')
        const td2 = document.createElement('td')
        td2.textContent = `${izinSurvey[index].mata_kuliah}`

        const td3 = document.createElement('td')
        const a = document.createElement('a')
        td3.classList.add('col-2')
        if (izinSurvey[index].file_izin_survey == null) {
            a.classList.add('text-decoration-none')
            a.textContent = '-'
        } else {
            a.setAttribute('href', `/docs/generate/survey/${izinSurvey[index].file_izin_survey}`)
            a.textContent = `${izinSurvey[index].file_izin_survey}`
        }


        const td4 = document.createElement('td')
        const created_at = izinSurvey[index].created_at
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
        td5.textContent = `${izinSurvey[index].penerima_tujuan}`

        const td6 = document.createElement('td')
        const span = document.createElement('span')
        const status = izinSurvey[index].status
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
        a2.setAttribute('href', `/detailSurveyViews/${izinSurvey[index].no_surat_izin_survey}`)
        const imgDetail = document.createElement('img')
        imgDetail.setAttribute('src', '/images/detail.png')
        imgDetail.classList.add('w-75')

        dataIzinSurvey[index].appendChild(th)
        dataIzinSurvey[index].appendChild(td1)
        dataIzinSurvey[index].appendChild(td2)
        dataIzinSurvey[index].appendChild(td3)
        td3.appendChild(a)
        dataIzinSurvey[index].appendChild(td4)
        dataIzinSurvey[index].appendChild(td5)
        dataIzinSurvey[index].appendChild(td6)
        td6.appendChild(span)
        dataIzinSurvey[index].appendChild(td7)
        if (status == 'diterima') {
            td7.textContent = '-'
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
                    const accRespSurvey = await fetch(`/accIzinSurvey/${izinSurvey[index].no_surat_izin_survey}`, {
                        method: 'GET'
                    })
                    const data = await accRespSurvey.json()
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            text: data.message,
                        });
                        setTimeout(() => {
                            window.location.href = '/riwayatIzinSurveyViews'
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
                const delSurveyResp = await fetch(`/tolakSuratIzinSurvey/${izinSurvey[index].no_surat_izin_survey}`, {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        keterangan: keterangan
                    })
                })
                const data = await delSurveyResp.json()
                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        text: data.message,
                    });
                    setTimeout(() => {
                        window.location.href = '/riwayatIzinSurveyViews'
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

    }
})