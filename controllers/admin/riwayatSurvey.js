const ModelSurvey = require('../../models/pengajuan_izin_survey')
const ModelDosen = require('../../models/dosen')
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const Mahasiswa = require('../../models/mahasiswa')

const allIzinSurvey = async (req, res) => {
    try {
        const izinSurvey = await ModelSurvey.findAll({
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
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa6'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa7'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa8'
                }
            ]
        })
        if (izinSurvey.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Data surat izin survey tersedia',
                data: izinSurvey
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

const detailSuratIzinSurvey = async (req, res) => {
    try {
        const no_surat_izin_survey = req.params.no_surat_izin_survey
        const findSurat = await ModelSurvey.findOne({
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
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa6'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa7'
                },
                {
                    model: Mahasiswa,
                    as: 'DataMahasiswa8'
                },
                {
                    model: ModelDosen,
                    as: 'DataDosen'
                }
            ],
            where: {
                no_surat_izin_survey: no_surat_izin_survey
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

const tolakSuratIzinSurvey = async (req, res) => {
    try {
        const no_surat_izin_survey = req.params.no_surat_izin_survey
        const keterangan = req.body.keterangan
        const findSurat = await ModelSurvey.findByPk(no_surat_izin_survey)
        if (findSurat && (findSurat.status == 'menunggu' || findSurat.status !== 'diterima')) {
            if (keterangan) {
                const updateSurat = await ModelSurvey.update({
                    status: 'ditolak',
                    keterangan: keterangan
                }, {
                    where: {
                        no_surat_izin_survey: no_surat_izin_survey
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

const generateSuratIzinSurvey = async (req, res) => {
    try {
        const no_surat_izin_survey = req.params.no_surat_izin_survey
        const niu_admin = process.env.niu_admin
        if (niu_admin == '') {
            res.status(403).json({
                success: false,
                message: 'admin not found'
            })
        } else {
            const findSurat = await ModelSurvey.findOne({
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
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa6'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa7'
                    },
                    {
                        model: Mahasiswa,
                        as: 'DataMahasiswa8'
                    }, {
                        model: ModelDosen,
                        as: 'DataDosen'
                    }
                ],
                where: {
                    no_surat_izin_survey: no_surat_izin_survey
                }
            })
            if (findSurat) {
    
                const no_surat_izin_survey = findSurat.no_surat_izin_survey
                const currentDate = new Date();
                const options = {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                };
                const tanggal_surat = currentDate.toLocaleDateString('id-ID', options);
                const mata_kuliah = findSurat.mata_kuliah
                const penerima_tujuan = findSurat.penerima_tujuan
                const nama_dosen = findSurat.DataDosen.nama_dosen
                const nip_dosen = findSurat.nip_dosen
    
                const instansi_tujuan = findSurat.instansi_tujuan
    
    
                const nim_mahasiswa = [];
                const nama_mahasiswa = [];
    
                for (let index = 1; index <= 8; index++) {
                    const mahasiswaKey = `DataMahasiswa${index}`;
    
                    if (findSurat[mahasiswaKey]) {
                        nim_mahasiswa.push(findSurat[mahasiswaKey].nim);
                        nama_mahasiswa.push(findSurat[mahasiswaKey].nama_mahasiswa);
                    }
                }
    
                const content = fs.readFileSync(
                    path.resolve(__dirname, '../', '../', "public", 'docs', 'template', "suratIzinSurvey.docx"),
                    "binary"
                );
    
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });
    
                doc.render({
                    no_surat_izin_survey: no_surat_izin_survey,
                    tanggal_surat: tanggal_surat,
                    mata_kuliah: mata_kuliah,
                    penerima_tujuan: penerima_tujuan,
                    nim_mahasiswa1: nim_mahasiswa[0] ?? '',
                    nim_mahasiswa2: nim_mahasiswa[1] ?? '',
                    nim_mahasiswa3: nim_mahasiswa[2] ?? '',
                    nim_mahasiswa4: nim_mahasiswa[3] ?? '',
                    nim_mahasiswa5: nim_mahasiswa[4] ?? '',
                    nim_mahasiswa6: nim_mahasiswa[4] ?? '',
                    nim_mahasiswa7: nim_mahasiswa[4] ?? '',
                    nim_mahasiswa8: nim_mahasiswa[4] ?? '',
                    nama_mahasiswa1: nama_mahasiswa[0] ?? '',
                    nama_mahasiswa2: nama_mahasiswa[1] ?? '',
                    nama_mahasiswa3: nama_mahasiswa[2] ?? '',
                    nama_mahasiswa4: nama_mahasiswa[3] ?? '',
                    nama_mahasiswa5: nama_mahasiswa[4] ?? '',
                    nama_mahasiswa6: nama_mahasiswa[4] ?? '',
                    nama_mahasiswa7: nama_mahasiswa[4] ?? '',
                    nama_mahasiswa8: nama_mahasiswa[4] ?? '',
                    nama_dosen: nama_dosen,
                    nip_dosen: nip_dosen
                });
    
                const buf = doc.getZip().generate({
                    type: "nodebuffer",
                    compression: "DEFLATE",
                });
    
                fs.writeFileSync(path.resolve(__dirname, '../', '../', 'public', 'docs', 'generate', 'survey', `${penerima_tujuan}_${tanggal_surat}_Surat Izin Survey.docx`), buf);
                const filename = `${penerima_tujuan}_${tanggal_surat}_Surat Izin Survey.docx`
                const updateIzinKp = await ModelSurvey.update({
                    file_izin_survey: filename,
                    niu_admin: niu_admin
    
                }, {
                    where: {
                        no_surat_izin_survey: no_surat_izin_survey
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

const accSuratIzinSurvey = async (req, res) => {
    try {
        const no_surat_izin_survey = req.params.no_surat_izin_survey
        const findSurat = await ModelSurvey.findByPk(no_surat_izin_survey)
        if (findSurat && findSurat.file_izin_survey != null) {
            const updateSurat = await ModelSurvey.update({
                status: 'diterima'
            }, {
                where: {
                    no_surat_izin_survey: no_surat_izin_survey
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
    allIzinSurvey,
    detailSuratIzinSurvey,
    tolakSuratIzinSurvey,
    generateSuratIzinSurvey,
    accSuratIzinSurvey
}