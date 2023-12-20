const ModelAdmin = require('../../models/admin')
const bcrypt = require('bcrypt')
require('dotenv').config()

const profileAdmin = async (req, res) => {
    try {
        const niu_admin = process.env.niu_admin
        if (niu_admin == '') {
            res.status(403).json({
                success: false,
                message: 'admin not found'
            })
        } else {
            const findAdmin = await ModelAdmin.findByPk(niu_admin)
            if (findAdmin) {
                res.status(200).json({
                    success: true,
                    message: 'Data admin ditemukan',
                    data: findAdmin
                })
            } else {
                res.statu(400).json({
                    success: false,
                    message: 'Data admin tidak ditemukan'
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

const updateProfileAdmin = async (req, res) => {
    try {
        const niu_admin = process.env.niu_admin
        const findAdmin = await ModelAdmin.findByPk(niu_admin)
        if (findAdmin) {
            var update
            var update2
    
            const username = req.body.username || findAdmin.username
            const name = req.body.name || findAdmin.name
            const new_password = req.body.new_password
    
            if (new_password) {
                if (name && name !== findAdmin.name) {
                    const findNamaAdmin = await ModelAdmin.findOne({
                        where: {
                            name: name
                        }
                    })
    
                    if (findNamaAdmin) {
                        update2 = false
                    } else {
                        update2 = true
                    }
                } else {
                    update2 = true
                }
            } else {
                if (name && name !== findAdmin.name) {
                    const findNamaAdmin = await ModelAdmin.findOne({
                        where: {
                            name: name
                        }
                    })
    
                    if (findNamaAdmin) {
                        update = false
                    } else {
                        update = true
                    }
                } else {
                    update = true
                }
            }
    
            if (update == true) {
                const updateProfile = await ModelAdmin.update({
                    name: name,
                    username: username
                }, {
                    where: {
                        niu_admin: niu_admin
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
        
                    const updateProfile = await ModelAdmin.update({
                        name: name,
                        username: username,
                        password: encryptPass
                    }, {
                        where: {
                            niu_admin: niu_admin
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
                    message: 'Nama Admin sudah pernah terdaftar'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Token telah habis'
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
    profileAdmin,
    updateProfileAdmin
}