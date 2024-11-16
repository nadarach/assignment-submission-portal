//Grant access to users with 'admin' role only
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied. Admins only');
  }
  next();
} 

//Grant access to users with 'user' role only
const authorizeUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).send("Access denied. Users only");
  }
  next();
}; 

module.exports = {
  authorizeAdmin,
  authorizeUser
}