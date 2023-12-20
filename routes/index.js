const users = require('./users')
const suratKp = require('./mahasiswa/suratKp')
const suratSurvey = require('./mahasiswa/suratSurvey')
const profile = require('./mahasiswa/profile')
const views = require('./views')
const dosen = require('./admin/dosen')
const mahasiswa = require('./admin/mahasiswa')
const riwayatIzinKp = require('./admin/riwayatIzinKp')
const riwayatSurvey = require('./admin/riwayatIzinSurvey')
const riwayatTugasKp = require('./admin/riwayatTugasKp')
const profileAdmin = require('./admin/profile')
const router = {}

router.users = users
router.suratKp = suratKp
router.suratSurvey = suratSurvey
router.profile = profile
router.views = views
router.dosen = dosen
router.mahasiswa = mahasiswa
router.riwayatIzinKp = riwayatIzinKp
router.riwayatSurvey = riwayatSurvey
router.riwayatTugasKp = riwayatTugasKp
router.profileAdmin = profileAdmin

module.exports = router