const isLogin = (req, res, next) => {
    if (req.session.user == null || req.session.user == undefined ) {
        req.flash('alertMessage', 'Masa berlaku telah habis, silahkan sign in kembali!!')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/signin')
    } else {
        next()
    }
}

module.exports = isLogin