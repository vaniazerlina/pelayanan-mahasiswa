const express = require('express')
const app = express.Router()
const controller = require('../../controllers/admin/mahasiswa')
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


app.get('/AllDataMahasiswaAdmin', verifyAdmin, controller.allDataMahasiswa)
app.get('/detailMahasiswa/:nim', verifyAdmin, controller.detailMahasiswa)
app.post('/addMahasiswa', verifyAdmin, controller.addMahasiswa)
app.post('/editDataMahasiswa/:nim', verifyAdmin, controller.editMahasiswa)
app.delete('/deleteMahasiswa/:nim', verifyAdmin, controller.deleteMahasiswa)

module.exports = app