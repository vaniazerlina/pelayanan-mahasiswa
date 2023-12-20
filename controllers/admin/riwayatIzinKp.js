const ModelIzinKp = require('../../models/pengajuan_izin_kp')
const ModelTugasKp = require('../../models/pengajuan_tugas_kp')
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const Mahasiswa = require('../../models/mahasiswa')

const allIzinKp = async (req, res) => {
    try {
        const izinKp = await ModelIzinKp.findAll({
            include: [{
                    model: Mahasiswa,
                    as: 'DataMahasiswa1'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa2'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa3'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa4'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa5'
                }
            ]
        })
        if (izinKp.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Data surat izin kerja praktek tersedia',
                data: izinKp
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data surat izin kerja praktek tidak tersedia'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const detailSuratIzin = async (req, res) => {
    try {
        const no_surat_izin_kp = req.params.no_surat_izin_kp
        const findSurat = await ModelIzinKp.findOne({
            include: [{
                    model: Mahasiswa,
                    as: 'DataMahasiswa1'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa2'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa3'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa4'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa5'
                }
            ],
            where: {
                no_surat_izin_kp: no_surat_izin_kp
            }
        })
        if (findSurat) {
            res.status(200).json({
                success: true,
                message: 'Data surat tersedia',
                data: findSurat
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data surat tidak tersedia'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

const tolakSuratIzin = async (req, res) => {
    try {
        const no_surat_izin_kp = req.params.no_surat_izin_kp
        const keterangan = req.body.keterangan
        const findSurat = await ModelIzinKp.findByPk(no_surat_izin_kp)
        if (findSurat && findSurat.status != 'diterima') {
            if (keterangan) {
                const updateSurat = await ModelIzinKp.update({
                    status: 'ditolak'
                }, {
                    where: {
                        no_surat_izin_kp: no_surat_izin_kp
                    }
                })
                if (updateSurat) {
                    res.status(200).json({
                        success: true,
                        message: 'Surat ditolak'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Surat tidak dapat ditolak'
                    })
                }  
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Silahkan sertakan alasan surat ditolak'
                })
            }
           
        } else {
            res.status(400).json({
                success: false,
                message: 'Data surat sudah berstatus diterima'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const generateSuratIzin = async (req, res) => {
    try {
        const no_surat_izin_kp = req.params.no_surat_izin_kp
        const niu_admin = process.env.niu_admin
        if (niu_admin == '') {
            res.status(403).json({
                success: false,
                message: 'admin not found'
            })
        } else {
            const findSurat = await ModelIzinKp.findOne({
                include: [{
                        model: Mahasiswa,
                        as: 'DataMahasiswa1'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa2'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa3'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa4'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa5'
                    }
                ],
                where: {
                    no_surat_izin_kp: no_surat_izin_kp
                }
            })
            if (findSurat) {
                const no_surat_izin_kp = findSurat.no_surat_izin_kp
                const instansi_tujuan = findSurat.instansi_tujuan
                const penerima_surat = findSurat.penerima_surat
                const tanggal_mulai_kp = findSurat.tanggal_mulai_kp
                const tanggal_selesai_kp = findSurat.tanggal_selesai_kp
                const currentDate = new Date();
                const tanggal_mulai = new Date(tanggal_mulai_kp);
                const tanggal_selesai = new Date(tanggal_selesai_kp)


                const options = {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                };
                const tanggal_surat = currentDate.toLocaleDateString('id-ID', options);
                const tgl_mulai = tanggal_mulai.toLocaleDateString('id-ID', options)
                const tgl_selesai = tanggal_selesai.toLocaleDateString('id-ID', options)

                const nim_mahasiswa = [];
                const nama_mahasiswa = [];
                const departemen = []

                for (let index = 1; index <= 5; index++) {
                    const mahasiswaKey = `DataMahasiswa${index}`;

                    if (findSurat[mahasiswaKey]) {
                        nim_mahasiswa.push(findSurat[mahasiswaKey].nim);
                        nama_mahasiswa.push(findSurat[mahasiswaKey].nama_mahasiswa);
                        departemen.push(findSurat[mahasiswaKey].departemen)
                    }
                }

                const content = fs.readFileSync(
                    path.resolve(__dirname, '../', '../', "public", 'docs', 'template', "suratIzinKp.docx"),
                    "binary"
                );

                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.render({
                    no_surat_izin_kp: no_surat_izin_kp,
                    created_at: tanggal_surat,
                    penerima_surat: penerima_surat,
                    tanggal_mulai_kp: tgl_mulai,
                    tanggal_selesai_kp: tgl_selesai,
                    nim_mahasiswa1: nim_mahasiswa[0] ?? '',
                    nim_mahasiswa2: nim_mahasiswa[1] ?? '',
                    nim_mahasiswa3: nim_mahasiswa[2] ?? '',
                    nim_mahasiswa4: nim_mahasiswa[3] ?? '',
                    nim_mahasiswa5: nim_mahasiswa[4] ?? '',
                    nama_mahasiswa1: nama_mahasiswa[0] ?? '',
                    nama_mahasiswa2: nama_mahasiswa[1] ?? '',
                    nama_mahasiswa3: nama_mahasiswa[2] ?? '',
                    nama_mahasiswa4: nama_mahasiswa[3] ?? '',
                    nama_mahasiswa5: nama_mahasiswa[4] ?? '',
                    departemen1: departemen[0] ?? '',
                    departemen2: departemen[1] ?? '',
                    departemen3: departemen[2] ?? '',
                    departemen4: departemen[3] ?? '',
                    departemen5: departemen[4] ?? '',
                });

                const buf = doc.getZip().generate({
                    type: "nodebuffer",
                    compression: "DEFLATE",
                });

                fs.writeFileSync(path.resolve(__dirname, '../', '../', 'public', 'docs', 'generate', 'izinKp', `${instansi_tujuan}_${tanggal_surat}_Surat Izin Kerja Praktek.docx`), buf);
                const filename = `${instansi_tujuan}_${tanggal_surat}_Surat Izin Kerja Praktek.docx`
                const updateIzinKp = await ModelIzinKp.update({
                    file_izin_kp: filename,
                    niu_admin: niu_admin

                }, {
                    where: {
                        no_surat_izin_kp: no_surat_izin_kp
                    }
                })
                if (updateIzinKp) {
                    res.status(200).json({
                        success: true,
                        message: 'Surat berhasil dibuat',
                        filename: filename
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Surat tidak berhasil dibuat'
                    })
                }

            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data surat tidak ditemukan'
                })
            }
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

const accSuratIzin = async (req, res) => {
    try {
        const no_surat_izin_kp = req.params.no_surat_izin_kp
        const findSurat = await ModelIzinKp.findByPk(no_surat_izin_kp)
        if (findSurat && findSurat.file_izin_kp != null) {
            const updateSurat = await ModelIzinKp.update({
                status: 'diterima'
            }, {
                where: {
                    no_surat_izin_kp: no_surat_izin_kp
                }
            })
            if (updateSurat) {
                res.status(200).json({
                    success: true,
                    message: 'Surat berhasil diterima'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'File surat belum tersedia'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

const generateTugasKp = async (req, res) => {
    try {
        const no_surat_izin_kp = req.params.no_surat_izin_kp
        const niu_admin = process.env.niu_admin
        if (niu_admin == '') {
            res.status(403).json({
                success: false,
                message: 'admin not found'
            })
        } else {
            const findSuratIzin = await ModelIzinKp.findOne({
                include: [{
                        model: Mahasiswa,
                        as: 'DataMahasiswa1'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa2'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa3'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa4'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa5'
                    }
                ],
                where: {
                    no_surat_izin_kp: no_surat_izin_kp,
                    status: 'diterima'
                }
            })
            if (findSuratIzin) {
                const findSuratTugas = await ModelTugasKp.findOne({
                    where: {
                        no_surat_izin_kp: no_surat_izin_kp
                    }
                })
                const no_surat_tugas_kp = findSuratTugas.no_surat_tugas_kp
                const currentDate = new Date();
                const tahun_surat = currentDate.getFullYear();

                const nim_mahasiswa = [];
                const nama_mahasiswa = [];

                for (let index = 1; index <= 5; index++) {
                    const mahasiswaKey = `DataMahasiswa${index}`;

                    if (findSuratIzin[mahasiswaKey]) {
                        nim_mahasiswa.push(findSuratIzin[mahasiswaKey].nim);
                        nama_mahasiswa.push(findSuratIzin[mahasiswaKey].nama_mahasiswa);
                    }
                }
                const instansi_tujuan = findSuratIzin.instansi_tujuan

                const options = {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                };
                const tanggal_mulai_kp = findSuratIzin.tanggal_mulai_kp
                const tanggal_mulai = new Date(tanggal_mulai_kp);
                const tgl_mulai = tanggal_mulai.toLocaleDateString('id-ID', options)

                const tanggal_selesai_kp = findSuratIzin.tanggal_selesai_kp
                const tanggal_selesai = new Date(tanggal_selesai_kp)
                const tgl_selesai = tanggal_selesai.toLocaleDateString('id-ID', options)

                const tanggal_surat = currentDate.toLocaleDateString('id-ID', options);

                const content = fs.readFileSync(
                    path.resolve(__dirname, '../', '../', "public", 'docs', 'template', "suratTugasKp.docx"),
                    "binary"
                );

                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.render({
                    no_surat_tugas_kp: no_surat_tugas_kp,
                    tahun_surat: tahun_surat,
                    nim_mahasiswa1: nim_mahasiswa[0] ?? '',
                    nim_mahasiswa2: nim_mahasiswa[1] ?? '',
                    nim_mahasiswa3: nim_mahasiswa[2] ?? '',
                    nim_mahasiswa4: nim_mahasiswa[3] ?? '',
                    nim_mahasiswa5: nim_mahasiswa[4] ?? '',
                    nama_mahasiswa1: nama_mahasiswa[0] ?? '',
                    nama_mahasiswa2: nama_mahasiswa[1] ?? '',
                    nama_mahasiswa3: nama_mahasiswa[2] ?? '',
                    nama_mahasiswa4: nama_mahasiswa[3] ?? '',
                    nama_mahasiswa5: nama_mahasiswa[4] ?? '',
                    instansi_tujuan: instansi_tujuan,
                    tanggal_mulai_kp: tgl_mulai,
                    tanggal_selesai_kp: tgl_selesai,
                    tanggal_surat: tanggal_surat
                });

                const buf = doc.getZip().generate({
                    type: "nodebuffer",
                    compression: "DEFLATE",
                });

                fs.writeFileSync(path.resolve(__dirname, '../', '../', 'public', 'docs', 'generate', 'tugasKp', `${instansi_tujuan}_${tanggal_surat}_Surat Tugas Kerja Praktek.docx`), buf);
                const filename = `${instansi_tujuan}_${tanggal_surat}_Surat Tugas Kerja Praktek.docx`
                const updateTugasKp = await ModelTugasKp.update({
                    file_tugas_kp: filename,
                    niu_admin: niu_admin
                }, {
                    where: {
                        no_surat_tugas_kp: no_surat_tugas_kp
                    }
                })
                if (updateTugasKp) {
                    res.status(200).json({
                        success: true,
                        message: 'Surat berhasil dibuat',
                        filename: filename
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Surat tidak berhasil dibuat'
                    })
                }

            } else {
                res.status(400).json({
                    success: false,
                    message: 'Status surat izin kerja praktek belum diterima'
                })
            }
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

module.exports = {
    allIzinKp,
    detailSuratIzin,
    tolakSuratIzin,
    generateSuratIzin,
    accSuratIzin,
    generateTugasKp
}