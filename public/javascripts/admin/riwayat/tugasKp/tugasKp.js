document.addEventListener('DOMContentLoaded', async () => {
    const allTugasKp = await fetch('/allTugasKpAdmin', {
        method: 'GET'
    })
    const dataTugasKp = await allTugasKp.json()
    let tugasKp = {}
    if (dataTugasKp.success) {
        tugasKp = dataTugasKp.data
    } else {
        Swal.fire({
            icon: "error",
            text: dataTugasKp.message
        });
    }

    const tabelTugasKp = document.getElementById('tabelTugasKp')
    for (let index = 0; index < tugasKp.length; index++) {
        const tr = document.createElement('tr')
        tabelTugasKp.appendChild(tr)
        tr.classList.add('data-tugas-kp')  
    }

    const DataTugasKp = document.getElementsByClassName('data-tugas-kp')
    for (let index = 0; index < DataTugasKp.length; index++) {
        const th = document.createElement('th')
        th.setAttribute('scope', 'row')
        th.textContent = index + 1

        const td1 = document.createElement('td')
        td1.textContent = `${tugasKp[index].no_surat_izin_kp}`
        td1.classList.add('col-1')
        const td2 = document.createElement('td')
        td2.textContent = `${tugasKp[index].DataIzinKp.DataMahasiswa1.nama_mahasiswa}`

        const td3 = document.createElement('td')
        const a = document.createElement('a')
        td3.classList.add('col-2')
        if (tugasKp[index].file_tugas_kp == null) {
            a.classList.add('text-decoration-none')
            a.textContent = '-'
        } else {
            a.setAttribute('href', `/docs/generate/tugasKp/${tugasKp[index].file_tugas_kp}`)
            a.textContent = `${tugasKp[index].file_tugas_kp}`
        }


        const td4 = document.createElement('td')
        const created_at = tugasKp[index].created_at
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
        td5.textContent = `${tugasKp[index].DataIzinKp.instansi_tujuan}`

        const td6 = document.createElement('td')
        const span = document.createElement('span')
        const status = tugasKp[index].status
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

        const buttonTerima = document.createElement('button')
        buttonTerima.setAttribute('type', 'button')
        buttonTerima.classList.add('btn', 'btn-outline-success', 'btn-sm')
        buttonTerima.textContent = 'Selesai'

        DataTugasKp[index].appendChild(th)
        DataTugasKp[index].appendChild(td1)
        DataTugasKp[index].appendChild(td2)
        DataTugasKp[index].appendChild(td3)
        td3.appendChild(a)
        DataTugasKp[index].appendChild(td4)
        DataTugasKp[index].appendChild(td5)
        DataTugasKp[index].appendChild(td6)
        td6.appendChild(span)
        DataTugasKp[index].appendChild(td7)
        if (status == 'diterima') {
            td7.textContent = '-'
        } else {
            td7.appendChild(buttonTerima)
        }

        buttonTerima.addEventListener('click', async () => {
            Swal.fire({
                title: "Apakah anda yakin ingin menandai selesai surat ini?",
                showDenyButton: true,
                confirmButtonText: "Ok",
                denyButtonText: `cancel`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const respTerima = await fetch(`/accTugasKp/${tugasKp[index].no_surat_tugas_kp}`, {
                        method: 'GET'
                    })
                    const data = await respTerima.json()
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            text: data.message,
                        });
                        setTimeout(() => {
                            window.location.href = '/riwayatTugasKpViews'
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
})