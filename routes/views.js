const express = require('express')
const app = express.Router()
const jwt = require('jsonwebtoken')
const controller = require('../controllers/views')

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
        return res.redirect('/loginMahasiswa');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.nim;
        next();
        
    } catch (error) {
        return res.redirect('/loginMahasiswa');
    }
};

app.get('/', controller.landingPage)
app.get('/loginMahasiswa', controller.loginMahasiswaViews)
app.get('/loginAdmin', controller.loginAdminViews)

//mahasiswa
app.get('/homeMahasiswa', verifyMahasiswa, controller.homePage2)
app.get('/formIzinKp',verifyMahasiswa, controller.formIzinKp)
app.get('/formSurvey',verifyMahasiswa, controller.formIzinSurvey)
app.get('/riwayatMahasiswa',verifyMahasiswa, controller.riwayatViews)
app.get('/profileMhs', verifyMahasiswa, controller.profileMahasiswaViews)

//admin
app.get('/dosenViews', verifyAdmin, controller.dosenAdminViews)
app.get('/mahasiswaViews', verifyAdmin, controller.mahasiswaAdminViews)
app.get('/riwayatIzinKpViews',verifyAdmin, controller.riwayatIzinKpViews)
app.get('/detailIzinKpViews/:no_surat_izin_kp',verifyAdmin, controller.detailIzinKpViews)
app.get('/riwayatTugasKpViews',verifyAdmin, controller.riwayatTugasKpViews)
app.get('/riwayatIzinSurveyViews',verifyAdmin, controller.riwayatIzinSurveyViews)
app.get('/detailSurveyViews/:no_surat_izin_survey',verifyAdmin, controller.detailIzinSurveyViews)
app.get('/profileAdminViews',verifyAdmin, controller.profileAdminViews)
app.get('/homeAdmin',verifyAdmin, controller.homeAdmin)


module.exports = app