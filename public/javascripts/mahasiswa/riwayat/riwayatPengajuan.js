document.addEventListener('DOMContentLoaded', async () => {
    //riwayat izin kp
    const responseKp = await fetch('/allIzinKp', {
        method: 'GET'
    })
    const dataKp = await responseKp.json()
    let kp = {}
    if (dataKp.success) {
        kp = dataKp.data
    } else {
        if (dataKp.message == 'nim not found') {
            window.location.href = '/loginMahasiswa'
        } else {
            Swal.fire({
                icon: "error",
                text: dataKp.message
            });
        }
    }

    const tabelIzinKp = document.getElementById('tabelIzinKp')
    for (let index = 0; index < kp.length; index++) {
        const tr = document.createElement('tr')
        tabelIzinKp.appendChild(tr)
        tr.classList.add('data-izin-kp')
    }

    const dataIzinKp = document.getElementsByClassName('data-izin-kp')
    for (let index = 0; index < dataIzinKp.length; index++) {
        const th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = index + 1

        const td = document.createElement('td')
        const a = document.createElement('a')
        td.appendChild(a)
        if (kp[index].file_izin_kp == null) {
            a.setAttribute('href', '')
            a.textContent = '-'
            a.classList.add('text-decoration-none')
        } else {
            a.setAttribute('href', `/docs/generate/izinKp/${kp[index].file_izin_kp}`)
            a.textContent = `${kp[index].file_izin_kp}`
            a.classList.add('text-decoration-none')
        }

        const td2 = document.createElement('td')
        const tanggal = kp[index].created_at
        const tgl = new Date(tanggal)
        const namaBulan = [
            "Januari", "Februari", "Maret", "April",
            "Mei", "Juni", "Juli", "Agustus",
            "September", "Oktober", "November", "Desember"
        ];
        const tahun = tgl.getFullYear()
        const bulan = tgl.getMonth()
        const bln = namaBulan[bulan]
        const hari = ("0" + tgl.getDate()).slice(-2);
        td2.textContent = `${hari} ${bln} ${tahun}`

        const td3 = document.createElement('td')
        td3.textContent = kp[index].instansi_tujuan

        const td4 = document.createElement('td')
        const span = document.createElement('span')
        span.classList.add('badge')
        if (kp[index].status == 'diterima') {
            span.classList.add('badge', 'text-bg-success')
        } else if (kp[index].status == 'ditolak') {
            span.classList.add('badge', 'text-bg-danger')
        } else {
            span.classList.add('badge', 'text-bg-primary')
        }
        span.textContent = kp[index].status
        td4.appendChild(span)

        const td5 = document.createElement('td')
        if (kp[index].keterangan == '') {
            td5.textContent = '-'
        } else {
            td5.textContent = kp[index].keterangan
        }

        dataIzinKp[index].appendChild(th)
        dataIzinKp[index].appendChild(td)
        dataIzinKp[index].appendChild(td2)
        dataIzinKp[index].appendChild(td3)
        dataIzinKp[index].appendChild(td4)
        dataIzinKp[index].appendChild(td5)
    }

    //riwayat izin survey
    const responseSurvey = await fetch('/allSuratSurvey', {
        method: 'GET'
    })
    const dataSurvey = await responseSurvey.json()
    let survey = {}
    if (dataSurvey.success) {
        survey = dataSurvey.data
    } else {
        if (dataSurvey.message == 'nim not found') {
            window.location.href = '/loginMahasiswa'
        } else {
            Swal.fire({
                icon: "error",
                text: dataSurvey.message
            });
        }
    }

    const tabelIzinSurvey = document.getElementById('tabelIzinSurvey')
    for (let index = 0; index < survey.length; index++) {
        const tr = document.createElement('tr')
        tabelIzinSurvey.appendChild(tr)
        tr.classList.add('data-izin-survey')
    }

    const dataIzinSurvey = document.getElementsByClassName('data-izin-survey')
    for (let index = 0; index < dataIzinSurvey.length; index++) {
        const th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = index + 1

        const td = document.createElement('td')
        const a = document.createElement('a')
        td.appendChild(a)
        if (survey[index].file_izin_survey == null) {
            a.setAttribute('href', '')
            a.textContent = '-'
            a.classList.add('text-decoration-none')
        } else {
            a.setAttribute('href', `/docs/generate/survey/${survey[index].file_izin_survey}`)
            a.textContent = `${survey[index].file_izin_survey}`
            a.classList.add('text-decoration-none')
        }

        const td2 = document.createElement('td')
        const tanggal = survey[index].created_at
        const tgl = new Date(tanggal)
        const namaBulan = [
            "Januari", "Februari", "Maret", "April",
            "Mei", "Juni", "Juli", "Agustus",
            "September", "Oktober", "November", "Desember"
        ];
        const tahun = tgl.getFullYear()
        const bulan = tgl.getMonth()
        const bln = namaBulan[bulan]
        const hari = ("0" + tgl.getDate()).slice(-2);
        td2.textContent = `${hari} ${bln} ${tahun}`

        const td3 = document.createElement('td')
        td3.textContent = survey[index].penerima_tujuan

        const td4 = document.createElement('td')
        const span = document.createElement('span')
        span.classList.add('badge')
        if (survey[index].status == 'diterima') {
            span.classList.add('badge', 'text-bg-success')
        } else if (survey[index].status == 'ditolak') {
            span.classList.add('badge', 'text-bg-danger')
        } else {
            span.classList.add('badge', 'text-bg-primary')
        }
        span.textContent = survey[index].status
        td4.appendChild(span)

        const td5 = document.createElement('td')
        if (survey[index].keterangan == '') {
            td5.textContent = '-'
        } else {
            td5.textContent = survey[index].keterangan
        }

        dataIzinSurvey[index].appendChild(th)
        dataIzinSurvey[index].appendChild(td)
        dataIzinSurvey[index].appendChild(td2)
        dataIzinSurvey[index].appendChild(td3)
        dataIzinSurvey[index].appendChild(td4)
        dataIzinSurvey[index].appendChild(td5)
    }

    // riwayat tugas kp
    const responseTugasKp = await fetch('/allTugasKp', {
        method: 'GET'
    })
    const dataTugasKp = await responseTugasKp.json()
    let tugasKp = {}
    if (dataTugasKp.success) {
        tugasKp = dataTugasKp.data
    } else {
        if (dataTugasKp.message == 'nim not found') {
            window.location.href = '/loginMahasiswa'
        } else {
            Swal.fire({
                icon: "error",
                text: dataTugasKp.message
            });
        }
    }

    const tabelTugasKp = document.getElementById('tabelTugasKp')
    for (let index = 0; index < tugasKp.length; index++) {
        const tr = document.createElement('tr')
        tabelTugasKp.appendChild(tr)
        tr.classList.add('data-tugas-kp')
    }

    const datatugasKp = document.getElementsByClassName('data-tugas-kp')
    for (let index = 0; index < datatugasKp.length; index++) {
        const th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = index + 1

        const td = document.createElement('td')
        const a = document.createElement('a')
        td.appendChild(a)
        if (tugasKp[index].file_tugas_kp == null) {
            a.setAttribute('href', '')
            a.textContent = '-'
            a.classList.add('text-decoration-none')
        } else {
            a.setAttribute('href', `/docs/generate/tugasKp/${tugasKp[index].file_tugas_kp}`)
            a.textContent = `${tugasKp[index].file_tugas_kp}`
            a.classList.add('text-decoration-none')
        }

        const td2 = document.createElement('td')
        const tanggal = tugasKp[index].created_at
        const tgl = new Date(tanggal)
        const namaBulan = [
            "Januari", "Februari", "Maret", "April",
            "Mei", "Juni", "Juli", "Agustus",
            "September", "Oktober", "November", "Desember"
        ];
        const tahun = tgl.getFullYear()
        const bulan = tgl.getMonth()
        const bln = namaBulan[bulan]
        const hari = ("0" + tgl.getDate()).slice(-2);
        td2.textContent = `${hari} ${bln} ${tahun}`

        const td3 = document.createElement('td')
        td3.textContent = tugasKp[index].DataIzinKp.instansi_tujuan

        const td4 = document.createElement('td')
        const span = document.createElement('span')
        span.classList.add('badge')
        if (tugasKp[index].status == 'diterima') {
            span.classList.add('badge', 'text-bg-success')
        } else if (tugasKp[index].status == 'ditolak') {
            span.classList.add('badge', 'text-bg-danger')
        } else {
            span.classList.add('badge', 'text-bg-primary')
        }
        span.textContent = tugasKp[index].status
        td4.appendChild(span)

        datatugasKp[index].appendChild(th)
        datatugasKp[index].appendChild(td)
        datatugasKp[index].appendChild(td2)
        datatugasKp[index].appendChild(td3)
        datatugasKp[index].appendChild(td4)
    }
})