const ModelIzinSurvey = require('../../models/pengajuan_izin_survey')
const { Op } = require('sequelize')

const addIzinSurvey = async (req, res) => {
    try {
        const nim_mahasiswa1 = req.body.nim_mahasiswa1
        const nim_mahasiswa2 = req.body.nim_mahasiswa2 || null
        const nim_mahasiswa3 = req.body.nim_mahasiswa3 || null
        const nim_mahasiswa4 = req.body.nim_mahasiswa4 || null
        const nim_mahasiswa5 = req.body.nim_mahasiswa5 || null
        const nim_mahasiswa6 = req.body.nim_mahasiswa6 || null
        const nim_mahasiswa7 = req.body.nim_mahasiswa7 || null
        const nim_mahasiswa8 = req.body.nim_mahasiswa8 || null
        const dosen_pengampu = req.body.dosen_pengampu
        const mata_kuliah = req.body.mata_kuliah
        const penerima_tujuan = req.body.penerima_tujuan

        if (!nim_mahasiswa1 || !dosen_pengampu || !mata_kuliah || !penerima_tujuan) {
            res.status(400).json({
                success: false,
                message: 'Lengkapi data surat izin survey anda'
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

            if (nim_mahasiswa6 !== null) {
                findSuratConditions.push({
                    [Op.or]: [
                        { nim_mahasiswa1: nim_mahasiswa6 },
                        { nim_mahasiswa2: nim_mahasiswa6 },
                        { nim_mahasiswa3: nim_mahasiswa6 },
                        { nim_mahasiswa4: nim_mahasiswa6 },
                        { nim_mahasiswa5: nim_mahasiswa6 }
                    ]
                });
            }

            if (nim_mahasiswa7 !== null) {
                findSuratConditions.push({
                    [Op.or]: [
                        { nim_mahasiswa1: nim_mahasiswa7 },
                        { nim_mahasiswa2: nim_mahasiswa7 },
                        { nim_mahasiswa3: nim_mahasiswa7 },
                        { nim_mahasiswa4: nim_mahasiswa7 },
                        { nim_mahasiswa5: nim_mahasiswa7 }
                    ]
                });
            }

            if (nim_mahasiswa8 !== null) {
                findSuratConditions.push({
                    [Op.or]: [
                        { nim_mahasiswa1: nim_mahasiswa8 },
                        { nim_mahasiswa2: nim_mahasiswa8 },
                        { nim_mahasiswa3: nim_mahasiswa8 },
                        { nim_mahasiswa4: nim_mahasiswa8 },
                        { nim_mahasiswa5: nim_mahasiswa8 }
                    ]
                });
            }

            const findSurat = await ModelIzinSurvey.findOne({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: findSuratConditions
                        },
                        {
                            nip_dosen: dosen_pengampu,
                            penerima_tujuan: penerima_tujuan,
                            status: ['diterima', 'menunggu']
                        }
                    ]
                }
            })

            if (findSurat) {
                res.status(400).json({
                    success: false,
                    message: 'Surat izin survey sudah pernah diajukan'
                })
            } else {
                const addSurat = await ModelIzinSurvey.create({
                    nim_mahasiswa1: nim_mahasiswa1,
                    nim_mahasiswa2: nim_mahasiswa2,
                    nim_mahasiswa3: nim_mahasiswa3,
                    nim_mahasiswa4: nim_mahasiswa4,
                    nim_mahasiswa5: nim_mahasiswa5,
                    nim_mahasiswa6: nim_mahasiswa6,
                    nim_mahasiswa7: nim_mahasiswa7,
                    nim_mahasiswa8: nim_mahasiswa8,
                    nip_dosen: dosen_pengampu,
                    mata_kuliah: mata_kuliah,
                    penerima_tujuan: penerima_tujuan,
                    status: 'menunggu'
                })
                if (addSurat) {
                    res.status(200).json({
                        success: true,
                        message: 'Surat izin survey dan pengambilan data berhasil diajukan'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Surat izin survey dan pengambilan data tidak berhasil diajukan'
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

const allAjuanSuratSurvey = async (req, res) => {
    try {
        const nim = process.env.nim

        const allSurvey = await ModelIzinSurvey.findAll({
            where: {
                [Op.or]: [
                    { nim_mahasiswa1: nim },
                    { nim_mahasiswa2: nim },
                    { nim_mahasiswa3: nim },
                    { nim_mahasiswa4: nim },
                    { nim_mahasiswa5: nim },
                    { nim_mahasiswa6: nim },
                    { nim_mahasiswa7: nim },
                    { nim_mahasiswa8: nim },
                ]
            }
        })
        if (allSurvey) {
            res.status(200).json({
                success: true,
                message: 'Riwayat pengajuan surat izin survey ditemukan',
                data: allSurvey
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Riwayat pengajuan surat izin survey tidak ditemukan',
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
    addIzinSurvey,
    allAjuanSuratSurvey
}