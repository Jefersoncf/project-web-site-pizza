
function admin (req, res, next) {
  if (req.isAuthenticated() && req.role === 'admin') {
    return next();
  }
  return res.redirect('/');
}
module.exports = admin;