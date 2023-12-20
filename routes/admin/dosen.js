const express = require('express')
const app = express.Router()
const controller = require('../../controllers/admin/dosen')
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

app.get('/dataDosenAdmin', verifyAdmin, controller.allDataDosen)
app.post('/addDataDosen',verifyAdmin, controller.addDataDosen)
app.post('/editDataDosen/:nip_dosen',verifyAdmin, controller.editDataDosen)
app.get('/detailDataDosen/:nip_dosen',verifyAdmin, controller.detailDosen)
app.delete('/deleteDataDosen/:nip_dosen',verifyAdmin, controller.deleteDosen)

module.exports = app