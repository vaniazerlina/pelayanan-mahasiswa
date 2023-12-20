const express = require('express')
const app = express.Router()
const controller = require('../../controllers/admin/riwayatSurvey')
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


app.get('/allIzinSurveyAdmin', verifyAdmin, controller.allIzinSurvey)
app.get('/detailSuratIzinSurvey/:no_surat_izin_survey', verifyAdmin, controller.detailSuratIzinSurvey)
app.post('/tolakSuratIzinSurvey/:no_surat_izin_survey',  verifyAdmin, controller.tolakSuratIzinSurvey)
app.get('/generateIzinSuvey/:no_surat_izin_survey',  verifyAdmin, controller.generateSuratIzinSurvey)
app.get('/accIzinSurvey/:no_surat_izin_survey',  verifyAdmin, controller.accSuratIzinSurvey)


module.exports = app