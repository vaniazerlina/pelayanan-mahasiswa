document.addEventListener('DOMContentLoaded', async () => {
    function noSuratIzinFromURL() {
        const url = window.location.href;
        const idRegex = /\/detailIzinKpViews\/(\d+)/;
        const matches = url.match(idRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return '';
    }

    const no_surat_izin_kp = noSuratIzinFromURL()

    const detailSuratResp = await fetch(`/detailSuratIzin/${no_surat_izin_kp}`, {
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

        const penerima_surat = document.getElementById('penerima_surat')
        penerima_surat.textContent = `${data.data.penerima_surat}`
        const instansi_tujuan = document.getElementById('instansi_tujuan')
        instansi_tujuan.textContent = `${data.data.instansi_tujuan}`
        const tanggal_kp = document.getElementById('tanggal_kp')

        const tanggal_mulai = data.data.tanggal_mulai_kp
        const tanggal_selesai = data.data.tanggal_selesai_kp

        const tgl_mulai = new Date(tanggal_mulai)
        const namaBulan = [
            "Januari", "Februari", "Maret", "April",
            "Mei", "Juni", "Juli", "Agustus",
            "September", "Oktober", "November", "Desember"
        ];
        const tahun = tgl_mulai.getFullYear();
        const bulanIndex = tgl_mulai.getMonth();
        const bulan = namaBulan[bulanIndex];
        const hari = tgl_mulai.getDate();

        const mulai = `${hari} ${bulan} ${tahun}`

        const tgl_selesai = new Date(tanggal_selesai)
        const tahun_selesai = tgl_selesai.getFullYear()
        const bulanIndexSelesai = tgl_selesai.getMonth()
        const bulanSelesai = namaBulan[bulanIndexSelesai]
        const hariSelesai = tgl_selesai.getDate()

        const selesai = `${hariSelesai} ${bulanSelesai} ${tahun_selesai}`

        tanggal_kp.textContent = `${mulai} - ${selesai}`
        const departemen = document.getElementById('departemen')
        departemen.textContent = `${data.data.departemen}`
    } else {
        Swal.fire({
            icon: "error",
            text: data.message
        });
    }

    const btnGenIzinKp = document.getElementById('btn-generate-izin-kp')
    btnGenIzinKp.addEventListener('click', async () => {
        const respGenIzinKp = await fetch(`/generateIzinKp/${no_surat_izin_kp}`, {
            method: 'GET'
        })
        const data = await respGenIzinKp.json()
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
})