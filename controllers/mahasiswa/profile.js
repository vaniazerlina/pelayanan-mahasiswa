const ModelMahasiswa = require('../../models/mahasiswa')
const bcrypt = require('bcrypt')
require('dotenv').config()

const profileMahasiswa = async (req, res) => {
    try {
        const nim = process.env.nim
        if (nim == '') {
            res.status(403).json({
                success: false,
                message: 'nim not found'
            })
        } else {
            const findMahasiswa = await ModelMahasiswa.findByPk(nim)
        if (findMahasiswa) {
            res.status(200).json({
                success: true,
                message: 'Data mahasiswa ditemukan',
                data: findMahasiswa
            })
        } else {
            res.statu(400).json({
                success: false,
                message: 'Data mahasiswa tidak ditemukan'
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

const updateProfileMahasiswa = async (req, res) => {
    try {
        const nim = process.env.nim
        const findMahasiswa = await ModelMahasiswa.findByPk(nim)
        if (findMahasiswa) {
            var update
            var update2
    
            const nama_mahasiswa = req.body.nama_mahasiswa || findMahasiswa.nama_mahasiswa
            const departemen = req.body.departemen || findMahasiswa.departemen
            const no_hp = req.body.no_hp || findMahasiswa.no_hp
            const new_password = req.body.new_password
    
            if (new_password) {
                if (nama_mahasiswa && nama_mahasiswa !== findMahasiswa.nama_mahasiswa) {
                    const findNamaMahasiswa = await ModelMahasiswa.findOne({
                        where: {
                            nama_mahasiswa: nama_mahasiswa
                        }
                    })
    
                    if (findNamaMahasiswa) {
                        update2 = false
                    } else {
                        update2 = true
                    }
                } else {
                    update2 = true
                }
            } else {
                if (nama_mahasiswa && nama_mahasiswa !== findMahasiswa.nama_mahasiswa) {
                    const findNamaMahasiswa = await ModelMahasiswa.findOne({
                        where: {
                            nama_mahasiswa: nama_mahasiswa
                        }
                    })
    
                    if (findNamaMahasiswa) {
                        update = false
                    } else {
                        update = true
                    }
                } else {
                    update = true
                }
            }
    
            if (update == true) {
                const updateProfile = await ModelMahasiswa.update({
                    nama_mahasiswa: nama_mahasiswa,  
                    departemen: departemen,  
                    no_hp: no_hp, 
                }, {
                    where: {
                        nim: nim
                    }
                })
    
                if (updateProfile) {
                    res.status(200).json({
                        success: true,
                        message: 'Akun berhasil diperbaharui'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Akun tidak berhasil diperbaharui'
                    })
                }
            } else if(update2 == true) {
                const salt = bcrypt.genSaltSync(10)
                    const encryptPass = bcrypt.hashSync(new_password, salt)
        
                    const updateProfile = await ModelMahasiswa.update({
                        nama_mahasiswa: nama_mahasiswa ,
                        departemen: departemen ,
                        no_hp: no_hp ,
                        password: encryptPass
                    }, {
                        where: {
                            nim: nim
                        }
                    })
        
                    if (updateProfile) {
                        res.status(200).json({
                            success: true,
                            message: 'Akun berhasil diperbaharui'
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Akun tidak berhasil diperbaharui'
                        })
                    }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Nama mahasiswa sudah pernah terdaftar'
                })
            }
        } else {
            return res.redirect('/loginMahasiswa')
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}


module.exports = {
    profileMahasiswa,
    updateProfileMahasiswa
}