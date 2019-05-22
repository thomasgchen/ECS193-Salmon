/* eslint-disable no-buffer-constructor */
// -----------------------------------------------------------------------
// authentication middleware

const auth = { login: 'admin', password: process.env.ADMIN_PASSWORD };

const authorize = (req, res, next) => {
  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  // Verify login and password are set and correct
  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }

  // Access denied...
  // res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).json({ status: 401, msg: 'Incorrect or missing password' }); // custom message
  return false;
};

module.exports = { authorize };
