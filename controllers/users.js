const response = require('express')
const ModelAdmin = require('../models/admin')
const ModelMahasiswa = require('../models/mahasiswa')
const ModelDosen = require('../models/dosen')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    try {
        const niu_admin = req.body.niu_admin
        const username = req.body.username
        const name = req.body.name
        const password = req.body.password

        if (!niu_admin || !username || !name || !password) {
            res.status(400).json({
                success: false,
                message: 'Lengkapi data anda'
            })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const encryptPass = bcrypt.hashSync(password, salt)

            const addAdmin = await ModelAdmin.create({
                niu_admin: niu_admin,
                username: username,
                name: name,
                password: encryptPass
            })

            if (addAdmin) {
                res.status(200).json({
                    success: true,
                    message: 'Data admin berhasil ditambahkan'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data admin tidak berhasail ditambahkan'
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

const loginAdmin = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (!username || !password) {
            res.status(400).json({
                success: false,
                message: 'Lengkapi data akun anda'
            })
        } else {
            const findAdmin = await ModelAdmin.findOne({
                where: {
                    username: username
                }
            })

            if (findAdmin) {
                const findPass = findAdmin.password
                const niu_admin = findAdmin.niu_admin
                bcrypt.compare(password, findPass, async (err, result) => {
                    if (err || !result) {
                        res.status(400).json({
                            success: false,
                            message: 'Password Anda Salah'
                        })
                    } else {
                        const token = jwt.sign({
                                niu_admin: niu_admin,
                            },
                            process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: '2h'
                            }
                        );

                        process.env.niu_admin = niu_admin

                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });

                        res.status(200).json({
                            success: true,
                            message: 'Login Berhasil',
                            token: token,
                            niu_admin: process.env.niu_admin
                        })

                    }
                })

            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data tidak ditemukan'
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

const loginMahasiswa = async (req, res) => {
    try {
        const nim = req.body.nim
        const password = req.body.password

        if (!nim || !password) {
            res.status(400).json({
                success: false,
                message: 'Lengkapi data akun anda'
            })
        } else {
            const findMahasiswa = await ModelMahasiswa.findByPk(nim)

            if (findMahasiswa) {
                const findPass = findMahasiswa.password
                const nim = findMahasiswa.nim
                bcrypt.compare(password, findPass, async (err, result) => {
                    if (err || !result) {
                        res.status(400).json({
                            success: false,
                            message: 'Password Anda Salah'
                        })
                    } else {
                        const token = jwt.sign({
                                nim: nim,
                            },
                            process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: '2h'
                            }
                        );

                        process.env.nim = nim

                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });

                        res.status(200).json({
                            success: true,
                            message: 'Login Berhasil',
                            token: token,
                            nim: process.env.nim
                        })

                    }
                })

            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data tidak ditemukan'
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

const allDataMahasiswa = async (req, res) => {
    try {
        const allMahasiswa = await ModelMahasiswa.findAll()
        if (allMahasiswa) {
            res.status(200).json({
                success: true,
                message: 'Data mahasiswa ditemukan',
                data: allMahasiswa
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data mahasiswa belum tersedia',
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

const allDataDosen = async (req, res) => {
    try {
        const allDosen = await ModelDosen.findAll()
        if (allDosen) {
            res.status(200).json({
                success: true,
                message: 'Data dosen tersedia',
                data: allDosen
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Data dosen tidak tesedia'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const logoutMahasiswa = async (req, res) => {
    try {
        res.clearCookie('sessionID');
        return res.redirect('/')
    } catch (error) {
        return res.redirect('/homeMahasiswa')
    }

}

const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('sessionID')
        return res.redirect('/')
    } catch (error) {
        return res.redirect('/homeAdmin')
    }

}


module.exports = {
    register,
    loginAdmin,
    loginMahasiswa,
    allDataMahasiswa,
    allDataDosen,
    logoutMahasiswa,
    logoutAdmin
}