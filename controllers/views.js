const landingPage = async (req, res) => {
    res.render('../views/index')
}

const loginMahasiswaViews = async (req, res) => {
    res.render('../views/loginMahasiswa')
}

const loginAdminViews = async (req, res) => {
    res.render('../views/loginAdmin')
}

const homePage2 = async (req, res) => {
    res.render('../views/user/homePage2')
}

const formIzinKp = async (req, res) => {
    res.render('../views/user/form/formIzinkp')
}

const formIzinSurvey = async (req, res) => {
    res.render('../views/user/form/formSurvey')
}

const riwayatViews = async (req, res) => {
    res.render('../views/user/riwayat/riwayatPengajuan')
}

const profileMahasiswaViews = async (req, res) => {
    res.render('../views/user/profile/profile')
}

const dosenAdminViews = async (req, res) => {
    res.render('../views/admin/dosen/dosen')
}

const mahasiswaAdminViews = async (req,res) => {
    res.render('../views/admin/mahasiswa/mahasiswa')
}

const riwayatIzinKpViews = async (req,res) => {
    res.render('../views/admin/riwayat/izinKP/riwayatIzinKp')
}

const detailIzinKpViews = async (req,res) => {
    res.render('../views/admin/riwayat/izinKP/detaiIzinKp')
}

const riwayatTugasKpViews = async (req,res) => {
    res.render('../views/admin/riwayat/tugasKp/riwayatTugasKp')

}

const riwayatIzinSurveyViews = async (req,res) => {
    res.render('../views/admin/riwayat/survey/riwayatIzinSurvey')
}

const detailIzinSurveyViews = async (req,res) => {
    res.render('../views/admin/riwayat/survey/detailSurvey')
}

const profileAdminViews = async(req,res) => {
    res.render('../views/admin/profile/profile')
}

const homeAdmin = async(req,res) => {
    res.render('../views/admin/homePage')
}

module.exports = {
    landingPage,
    loginMahasiswaViews,
    loginAdminViews,
    formIzinKp,
    homePage2,
    formIzinSurvey,
    riwayatViews,
    profileMahasiswaViews,
    dosenAdminViews,
    mahasiswaAdminViews,
    riwayatIzinKpViews,
    detailIzinKpViews,
    riwayatTugasKpViews,
    riwayatIzinSurveyViews,
    detailIzinSurveyViews,
    profileAdminViews,
    homeAdmin
}