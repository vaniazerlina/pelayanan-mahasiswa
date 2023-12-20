const ModelDosen = require('../../models/dosen')

const allDataDosen = async (req, res) => {
    try {
        const dataDosen = await ModelDosen.findAll()
        if (dataDosen.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Data dosen ditemukan',
                data: dataDosen
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data dosen belum tersedia'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const addDataDosen = async (req, res) => {
    try {
        const nip_dosen = req.body.nip_dosen
        const nama_dosen = req.body.nama_dosen

        if (!nip_dosen || !nama_dosen) {
            res.status(400).json({
                success: false,
                message: 'Lengkapi inputan data dosen anda'
            })
        } else {
            const findNip = await ModelDosen.findOne({
                where: {
                    nip_dosen: nip_dosen
                }
            })
            if (findNip) {
                res.status(400).json({
                    success: false,
                    message: `Dosen dengan nip ${nip_dosen} sudah terdaftar`
                })
            } else {
                const addDosen = await ModelDosen.create({
                    nip_dosen: nip_dosen,
                    nama_dosen: nama_dosen
                })
                if (addDosen) {
                    res.status(200).json({
                        success: true,
                        message: 'Data dosen berhasil ditambahkan'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Data dosen tidak berhasil ditambahkan'
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

const editDataDosen = async (req, res) => {
    // try {
        const nip_dosen = req.params.nip_dosen
        const findNip = await ModelDosen.findByPk(nip_dosen)
        if (findNip) {
            const nama_dosen = req.body.nama_dosen || findNip.nama_dosen
            const editDosen = await ModelDosen.update({
                nama_dosen: nama_dosen
            }, {
                where: {
                    nip_dosen: nip_dosen
                }
            })
            if (editDosen) {
                res.status(200).json({
                    success: true,
                    message: 'Data dosen berhasil diperbaharui'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data dosen tidak berhasil diperbaharui'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Data dosen tidak ditemukan'
            })
        }
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: error
    //     })
    // }

}

const detailDosen = async (req, res) => {
    try {
        const nip_dosen = req.params.nip_dosen
        const findNip = await ModelDosen.findByPk(nip_dosen)
        if (findNip) {
            res.status(200).json({
                success: true,
                message: 'Data dosen ditemukan',
                data: findNip
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data dosen tidak ditemukan'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

const deleteDosen = async (req, res) => {
    try {
        const nip_dosen = req.params.nip_dosen
        const findNip = await ModelDosen.findByPk(nip_dosen)
        if (findNip) {
            const deleted = await ModelDosen.destroy({
                where: {
                    nip_dosen: nip_dosen
                }
            })
            if (deleted) {
                res.status(200).json({
                    success: true,
                    message: 'Data dosen berhasil dihapus'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data dosen tidak berhasil dihapus'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Data dosen tidak ditemukan'
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
    allDataDosen,
    addDataDosen,
    editDataDosen,
    detailDosen,
    deleteDosen
}