const express = require('express')
const app = express.Router()
const controller = require('../../controllers/admin/riwayatIzinKp')
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


app.get('/allIzinKpAdmin',verifyAdmin, controller.allIzinKp)
app.get('/detailSuratIzin/:no_surat_izin_kp', verifyAdmin, controller.detailSuratIzin)
app.post('/tolakSuratIzin/:no_surat_izin_kp', verifyAdmin, controller.tolakSuratIzin)
app.get('/generateIzinKp/:no_surat_izin_kp', verifyAdmin, controller.generateSuratIzin)
app.get('/accIzinKp/:no_surat_izin_kp', verifyAdmin, controller.accSuratIzin)
app.get('/generateTugasKp/:no_surat_izin_kp', verifyAdmin, controller.generateTugasKp)


module.exports = app