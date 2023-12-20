const ModelTugasKp = require('../../models/pengajuan_tugas_kp')
const ModelIzinKp = require('../../models/pengajuan_izin_kp')
const Mahasiswa = require('../../models/mahasiswa')

const allTugasKp = async (req, res) => {
    try {
        const tugasKp = await ModelTugasKp.findAll({
            include: [{
                model: ModelIzinKp,
                as: 'DataIzinKp',
                where: {
                    status: ['diterima', 'menunggu']
                },
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
            }]
        });

        if (tugasKp.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Data surat izin survey tersedia',
                data: tugasKp
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data surat izin survey tidak tersedia'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const accSuratTugasKp = async (req, res) => {
    try {
        const no_surat_tugas_kp = req.params.no_surat_tugas_kp
        const findSurat = await ModelTugasKp.findByPk(no_surat_tugas_kp)
        if (findSurat && findSurat.file_tugas_kp != null) {
            const updateSurat = await ModelTugasKp.update({
                status: 'diterima'
            }, {
                where: {
                    no_surat_tugas_kp: no_surat_tugas_kp
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

module.exports = {
    allTugasKp,
    accSuratTugasKp
}