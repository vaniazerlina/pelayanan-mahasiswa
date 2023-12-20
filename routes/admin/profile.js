const express = require('express')
const app = express.Router()
const controller = require('../../controllers/admin/profile')
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



app.get('/profileAdmin', verifyAdmin, controller.profileAdmin)
app.post('/updateProfileAdmin', verifyAdmin, controller.updateProfileAdmin)

module.exports = app
