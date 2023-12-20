const express = require('express')
const app = express.Router()
const controller = require('../controllers/users')
const jwt = require('jsonwebtoken')

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/loginAdmin');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.niu_admin;
        next();
    } catch (error) {
        return res.redirect('/loginAdmin');
    }
};


const verifyMahasiswa = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(400).json({
            success: false,
            message: 'Token Telah Habis'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.nim;
        next();
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Token Telah Habis'
        })
    }
};

app.post('/register', controller.register)
app.post('/loginAdmin', controller.loginAdmin)
app.post('/loginMahasiswa', controller.loginMahasiswa)
app.get('/dataMahasiswa', verifyMahasiswa, controller.allDataMahasiswa)
app.get('/dataDosen', verifyMahasiswa, controller.allDataDosen)
app.get('/logoutMahasiswa', verifyMahasiswa, controller.logoutMahasiswa)
app.get('/logoutAdmin', verifyAdmin, controller.logoutAdmin)

module.exports = app