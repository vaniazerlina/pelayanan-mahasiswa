const express = require('express')
const app = express.Router()
const controller = require('../../controllers/mahasiswa/profile')
const jwt = require('jsonwebtoken')

const verifyMahasiswa = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/loginMahasiswa')
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.nim;
        next();
        
    } catch (error) {
        return res.redirect('/loginMahasiwa')
    }
};


app.get('/profileMahasiswa', verifyMahasiswa, controller.profileMahasiswa)
app.post('/updateProfileMahasiswa', verifyMahasiswa, controller.updateProfileMahasiswa)

module.exports = app
