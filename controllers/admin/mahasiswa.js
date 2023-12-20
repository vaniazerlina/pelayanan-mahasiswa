const ModelMahasiswa = require('../../models/mahasiswa')
const bcrypt = require('bcrypt')

const allDataMahasiswa = async (req, res) => {
    try {
        const findMahasiswa = await ModelMahasiswa.findAll()
        if (findMahasiswa.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Data mahasiswa ditemukan',
                data: findMahasiswa
            })
        } else {
            res.status(400).json({
                success: false,
                meessage: 'Data mahasiswa belum tersedia'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

const detailMahasiswa = async (req, res) => {
    try {
        const nim = req.params.nim
        const findNim = await ModelMahasiswa.findByPk(nim)
        if (findNim) {
            res.status(200).json({
                success: true,
                meessage: 'Data mahasiswa ditemukan',
                data: findNim
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data mahasiswa tidak ditemukan'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

const addMahasiswa = async (req, res) => {
    try {
        const nim = req.body.nim
        const nama_mahasiswa = req.body.nama_mahasiswa
        const no_hp = req.body.no_hp
        const password = req.body.password

        if (!nim || !nama_mahasiswa || !no_hp || !password) {
            res.status(400).json({
                success: false,
                message: 'Lengkapi inputan data mahasiswa'
            })
        } else {
            const findnim = await ModelMahasiswa.findByPk(nim)
            if (findnim) {
                res.status(400).json({
                    success: false,
                    message: `Mahasiswa dengan ${nim} sudah terdaftar`
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const encryptPass = bcrypt.hashSync(password, salt)

                const add = await ModelMahasiswa.create({
                    nim: nim,
                    nama_mahasiswa: nama_mahasiswa,
                    departemen: 'Sistem Informasi',
                    no_hp: no_hp,
                    password: encryptPass
                })
                if (add) {
                    res.status(200).json({
                        success: true,
                        message: 'Data mahasiswa berhasil ditambahkan'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Data mahasiswa tidak berhasil ditambahkan'
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

const editMahasiswa = async (req, res) => {
    try {
        const nim = req.params.nim

        const findnim = await ModelMahasiswa.findByPk(nim)
        if (findnim) {
            const nama_mahasiswa = req.body.nama_mahasiswa || findnim.nama_mahasiswa
            const no_hp = req.body.no_hp || findnim.no_hp
            const password = req.body.password || findnim.password
            var encryptPass;
            if (password) {
                const salt = bcrypt.genSaltSync(10)
                encryptPass = bcrypt.hashSync(password, salt)
            } else {
                encryptPass = findnim.password
            }
            const edit = await ModelMahasiswa.update({
                nama_mahasiswa: nama_mahasiswa,
                no_hp: no_hp,
                password: encryptPass
            }, {
                where: {
                    nim: nim
                }
            })
            if (edit) {
                res.status(200).json({
                    success: true,
                    message: 'Data mahasiswa berhasil diperbaharui'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data mahasiswa tidak berhasil diperbaharui'
                })
            }

        } else {
            res.status(400).json({
                success: false,
                message: 'Data mahasiswa tidak ditemukan'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}

const deleteMahasiswa = async (req, res) => {
    try {
        const nim = req.params.nim
        const findnim = await ModelMahasiswa.findByPk(nim)
        if (findnim) {
            const del = await ModelMahasiswa.destroy({
                where: {
                    nim: nim
                }
            })
            if (del) {
                res.status(200).json({
                    success: true,
                    message: 'Data mahasiswa berhasil dihapus'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data mahasiswa tidak berhasil dihapus'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Data mahasiswa tidak ditemukan'
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
    allDataMahasiswa,
    detailMahasiswa,
    addMahasiswa,
    editMahasiswa,
    deleteMahasiswa
}