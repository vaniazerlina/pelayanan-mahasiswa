const ModelIzinKp = require('../../models/pengajuan_izin_kp')
const ModelTugasKp = require('../../models/pengajuan_tugas_kp')
const ModelMahasiswa = require('../../models/mahasiswa')
const {
    Op
} = require('sequelize')
require('dotenv').config();

const addIzinKp = async (req, res) => {
    try {
    const nim_mahasiswa1 = req.body.nim_mahasiswa1
    const nim_mahasiswa2 = req.body.nim_mahasiswa2 || null
    const nim_mahasiswa3 = req.body.nim_mahasiswa3 || null
    const nim_mahasiswa4 = req.body.nim_mahasiswa4 || null
    const nim_mahasiswa5 = req.body.nim_mahasiswa5 || null
    const instansi_tujuan = req.body.instansi_tujuan
    const penerima_surat = req.body.penerima_surat
    const tanggal_mulai_kp = req.body.tanggal_mulai_kp
    const tanggal_selesai_kp = req.body.tanggal_selesai_kp
    const departemen = req.body.departemen

    if (!nim_mahasiswa1 || !instansi_tujuan || !penerima_surat || !tanggal_mulai_kp || !tanggal_selesai_kp || !departemen) {
        res.status(400).json({
            success: false,
            message: 'Lengkapi data surat izin kerja praktek anda'
        })
    } else {

        const findSuratConditions = [];

        if (nim_mahasiswa1 !== null) {
            findSuratConditions.push({
                [Op.or]: [
                    { nim_mahasiswa1: nim_mahasiswa1 },
                    { nim_mahasiswa2: nim_mahasiswa1 },
                    { nim_mahasiswa3: nim_mahasiswa1 },
                    { nim_mahasiswa4: nim_mahasiswa1 },
                    { nim_mahasiswa5: nim_mahasiswa1 }
                ]
            });
        }

        if (nim_mahasiswa2 !== null) {
            findSuratConditions.push({
                [Op.or]: [
                    { nim_mahasiswa1: nim_mahasiswa2 },
                    { nim_mahasiswa2: nim_mahasiswa2 },
                    { nim_mahasiswa3: nim_mahasiswa2 },
                    { nim_mahasiswa4: nim_mahasiswa2 },
                    { nim_mahasiswa5: nim_mahasiswa2 }
                ]
            });
        }

        if (nim_mahasiswa3 !== null) {
            findSuratConditions.push({
                [Op.or]: [
                    { nim_mahasiswa1: nim_mahasiswa3 },
                    { nim_mahasiswa2: nim_mahasiswa3 },
                    { nim_mahasiswa3: nim_mahasiswa3 },
                    { nim_mahasiswa4: nim_mahasiswa3 },
                    { nim_mahasiswa5: nim_mahasiswa3 }
                ]
            });
        }

        if (nim_mahasiswa4 !== null) {
            findSuratConditions.push({
                [Op.or]: [
                    { nim_mahasiswa1: nim_mahasiswa4 },
                    { nim_mahasiswa2: nim_mahasiswa4 },
                    { nim_mahasiswa3: nim_mahasiswa4 },
                    { nim_mahasiswa4: nim_mahasiswa4 },
                    { nim_mahasiswa5: nim_mahasiswa4 }
                ]
            });
        }

        if (nim_mahasiswa5 !== null) {
            findSuratConditions.push({
                [Op.or]: [
                    { nim_mahasiswa1: nim_mahasiswa5 },
                    { nim_mahasiswa2: nim_mahasiswa5 },
                    { nim_mahasiswa3: nim_mahasiswa5 },
                    { nim_mahasiswa4: nim_mahasiswa5 },
                    { nim_mahasiswa5: nim_mahasiswa5 }
                ]
            });
        }
        

        const findSurat = await ModelIzinKp.findOne({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: findSuratConditions
                    },
                    {
                        status: ['diterima', 'menunggu']
                    }
                ]
            }
        })

    
        if (findSurat && (findSurat.status == 'diterima' || findSurat.status == 'menunggu') ){
            res.status(400).json({
                success: false,
                message: 'Surat izin kerja praktek sudah pernah diajukan'
            })
        } else {
            const addIzinKp = await ModelIzinKp.create({
                nim_mahasiswa1: nim_mahasiswa1,
                nim_mahasiswa2: nim_mahasiswa2,
                nim_mahasiswa3: nim_mahasiswa3,
                nim_mahasiswa4: nim_mahasiswa4,
                nim_mahasiswa5: nim_mahasiswa5,
                instansi_tujuan: instansi_tujuan,
                penerima_surat: penerima_surat,
                tanggal_mulai_kp: tanggal_mulai_kp,
                tanggal_selesai_kp: tanggal_selesai_kp,
                departemen: departemen,
                status: 'menunggu'
            })
            if (addIzinKp) {
                const no_surat_izin_kp = addIzinKp.no_surat_izin_kp
                const addTugasKp = await ModelTugasKp.create({
                    no_surat_izin_kp: no_surat_izin_kp,
                    status: 'menunggu'
                })
                if (addTugasKp) {
                    res.status(200).json({
                        success: true,
                        message: 'Surat Izin Kerja Praktek Berhasil di Ajukan'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Surat Izin Kerja Praktek Tidak Berhasil di Ajukan'
                    })
                }

            } else {
                res.status(400).json({
                    success: false,
                    message: 'Surat Izin Kerja Praktek Tidak Berhasil di Ajukan'
                })
            }
        }
    }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

const allIzinKp = async (req, res) => {
    try {
        const nim = process.env.nim
        console.log(nim)
        if (nim == '') {
            res.status(403).json({
                success: false,
                message: 'nim not found'
            })
        } else {
            const findIzinKp = await ModelIzinKp.findAll({
                where: {
                    [Op.or]: [{
                            nim_mahasiswa1: nim
                        },
                        {
                            nim_mahasiswa2: nim
                        },
                        {
                            nim_mahasiswa3: nim
                        },
                        {
                            nim_mahasiswa4: nim
                        },
                        {
                            nim_mahasiswa5: nim
                        }
                    ]
                }
            })
            if (findIzinKp) {
                res.status(200).json({
                    success: true,
                    message: 'Riwayat surat izin kerja praktek tersedia',
                    data: findIzinKp
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Riwayat surat izin kerja praktek tidak tersedia',
                    data: []
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

const allTugasKp = async (req, res) => {
    try {
        const nim = process.env.nim
        const findTugasKp = await ModelTugasKp.findAll({
            include: [{
                model: ModelIzinKp,
                as: 'DataIzinKp',
                where: {
                    [Op.or]: [{
                            nim_mahasiswa1: nim
                        },
                        {
                            nim_mahasiswa2: nim
                        },
                        {
                            nim_mahasiswa3: nim
                        },
                        {
                            nim_mahasiswa4: nim
                        },
                        {
                            nim_mahasiswa5: nim
                        }
                    ]
                }
            }]
        })
        console.log(findTugasKp)
        console.log(nim)
        if (findTugasKp) {
            res.status(200).json({
                success: true,
                message: 'Riwayat surat tugas kerja praktek tersedia',
                data: findTugasKp
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Riwayat surat tugas kerja praktek tidak tersedia',
                data: []
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

module.exports = {
    addIzinKp,
    allIzinKp,
    allTugasKp
}