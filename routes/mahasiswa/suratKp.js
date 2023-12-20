const express = require('express')
const app = express.Router()
const controller = require('../../controllers/mahasiswa/suratKp')
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
        return res.redirect('/loginMahasiswa')
    }
};

app.post('/addIzinKp', verifyMahasiswa, controller.addIzinKp)
app.get('/allIzinKp', verifyMahasiswa, controller.allIzinKp)
app.get('/allTugasKp', verifyMahasiswa, controller.allTugasKp)

module.exports = app