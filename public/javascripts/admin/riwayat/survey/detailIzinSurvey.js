document.addEventListener('DOMContentLoaded', async () => {
    function noSuratIzinFromURL() {
        const url = window.location.href;
        const idRegex = /\/detailSurveyViews\/(\d+)/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }

    const no_surat_izin_survey = noSuratIzinFromURL()
    const detailSuratResp = await fetch(`/detailSuratIzinSurvey/${no_surat_izin_survey}`, {
        method: 'GET'
    })
    const data = await detailSuratResp.json()
    console.log(data)
    if (data.success) {
        const nama_mahasiswa1 = document.getElementById('nama_mahasiswa1')
        if (data.data.DataMahasiswa1 == null) {
            nama_mahasiswa1.textContent = '-'
        } else {
            nama_mahasiswa1.textContent = `${data.data.DataMahasiswa1.nama_mahasiswa}`
        }
        const nim_mahasiswa1 = document.getElementById('nim_mahasiswa1')
        if (data.data.DataMahasiswa1 == null) {
            nim_mahasiswa1.textContent = '-'
        } else {
            nim_mahasiswa1.textContent = `${data.data.DataMahasiswa1.nim}`
        }


        const nama_mahasiswa2 = document.getElementById('nama_mahasiswa2')
        if (data.data.DataMahasiswa2 == null) {
            nama_mahasiswa2.textContent = '-'
        } else {
            nama_mahasiswa2.textContent = `${data.data.DataMahasiswa2.nama_mahasiswa}`
        }
        const nim_mahasiswa2 = document.getElementById('nim_mahasiswa2')
        if (data.data.DataMahasiswa2 == null) {
            nim_mahasiswa2.textContent = '-'
        } else {
            nim_mahasiswa2.textContent = `${data.data.DataMahasiswa2.nim}`
        }

        const nama_mahasiswa3 = document.getElementById('nama_mahasiswa3')
        if (data.data.DataMahasiswa3 == null) {
            nama_mahasiswa3.textContent = '-'
        } else {
            nama_mahasiswa3.textContent = `${data.data.DataMahasiswa3.nama_mahasiswa}`
        }
        const nim_mahasiswa3 = document.getElementById('nim_mahasiswa3')
        if (data.data.DataMahasiswa3 == null) {
            nim_mahasiswa3.textContent = '-'
        } else {
            nim_mahasiswa3.textContent = `${data.data.DataMahasiswa3.nim}`
        }


        const nama_mahasiswa4 = document.getElementById('nama_mahasiswa4')
        if (data.data.DataMahasiswa4 == null) {
            nama_mahasiswa4.textContent = '-'
        } else {
            nama_mahasiswa4.textContent = `${data.data.DataMahasiswa4.nama_mahasiswa}`
        }
        const nim_mahasiswa4 = document.getElementById('nim_mahasiswa4')
        if (data.data.DataMahasiswa4 == null) {
            nim_mahasiswa4.textContent = '-'
        } else {
            nim_mahasiswa4.textContent = `${data.data.DataMahasiswa4.nim}`
        }


        const nama_mahasiswa5 = document.getElementById('nama_mahasiswa5')
        if (data.data.DataMahasiswa5 == null) {
            nama_mahasiswa5.textContent = '-'
        } else {
            nama_mahasiswa5.textContent = `${data.data.DataMahasiswa5.nama_mahasiswa}`
        }
        const nim_mahasiswa5 = document.getElementById('nim_mahasiswa5')
        if (data.data.DataMahasiswa5 == null) {
            nim_mahasiswa5.textContent = '-'
        } else {
            nim_mahasiswa5.textContent = `${data.data.DataMahasiswa5.nim}`
        }

        const nama_mahasiswa6 = document.getElementById('nama_mahasiswa6')
        if (data.data.DataMahasiswa6 == null) {
            nama_mahasiswa6.textContent = '-'
        } else {
            nama_mahasiswa6.textContent = `${data.data.DataMahasiswa6.nama_mahasiswa}`
        }
        const nim_mahasiswa6 = document.getElementById('nim_mahasiswa6')
        if (data.data.DataMahasiswa6 == null) {
            nim_mahasiswa6.textContent = '-'
        } else {
            nim_mahasiswa6.textContent = `${data.data.DataMahasiswa6.nim}`
        }

        const nama_mahasiswa7 = document.getElementById('nama_mahasiswa7')
        if (data.data.DataMahasiswa7 == null) {
            nama_mahasiswa7.textContent = '-'
        } else {
            nama_mahasiswa7.textContent = `${data.data.DataMahasiswa7.nama_mahasiswa}`
        }
        const nim_mahasiswa7 = document.getElementById('nim_mahasiswa7')
        if (data.data.DataMahasiswa7 == null) {
            nim_mahasiswa7.textContent = '-'
        } else {
            nim_mahasiswa7.textContent = `${data.data.DataMahasiswa7.nim}`
        }

        const nama_mahasiswa8 = document.getElementById('nama_mahasiswa8')
        if (data.data.DataMahasiswa8 == null) {
            nama_mahasiswa8.textContent = '-'
        } else {
            nama_mahasiswa8.textContent = `${data.data.DataMahasiswa8.nama_mahasiswa}`
        }
        const nim_mahasiswa8 = document.getElementById('nim_mahasiswa8')
        if (data.data.DataMahasiswa8 == null) {
            nim_mahasiswa8.textContent = '-'
        } else {
            nim_mahasiswa8.textContent = `${data.data.DataMahasiswa8.nim}`
        }

        const nama_dosen = document.getElementById('nama_dosen')
        nama_dosen.textContent = `${data.data.DataDosen.nama_dosen}`

        const mata_kuliah = document.getElementById('mata_kuliah')
        mata_kuliah.textContent = `${data.data.mata_kuliah}`

        const instansi_tujuan = document.getElementById('instansi_tujuan')
        instansi_tujuan.textContent = `${data.data.penerima_tujuan}`

    } else {
        Swal.fire({
            icon: "error",
            text: data.message
        });
    }

    const btnGenIzinSurvey = document.getElementById('btn-generate-izin-survey')
    btnGenIzinSurvey.addEventListener('click', async () => {
        const respGenIzinKp = await fetch(`/generateIzinSuvey/${no_surat_izin_survey}`, {
            method: 'GET'
        })
        const data = await respGenIzinKp.json()
        if (data.success) {
            Swal.fire({
                icon: "success",
                text: data.message,
            });
            setTimeout(() => {
                window.location.href = '/riwayatIzinSurveyViews'
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
})