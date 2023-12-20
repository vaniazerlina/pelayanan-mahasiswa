const express = require('express')
const app = express.Router()
const controller = require('../../controllers/admin/riwayatTugasKp')
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


app.get('/allTugasKpAdmin', verifyAdmin, controller.allTugasKp)
app.get('/accTugasKp/:no_surat_tugas_kp',  verifyAdmin, controller.accSuratTugasKp)

module.exports = app