JWT = require("jsonwebtoken");

function generateAccessToken(user) {
  return JWT.sign(user, process.env.JWTSECRET, { expiresIn: '120' });
}
// asd
// currently not in use
// function generateRefreshToken(user) {
//   return JWT.sign(user, process.env.JWTSECRETREFRESH);
// }

function verifyToken(req, res, next) {
  // config paths that dont need to be verified
  const nonSecurePaths = [
    "/api/users/login",
    "/api/users/register",
    "/api/transactions/affiliate",
    "/api/users/autoLoginUser",
    "/api/users/autoLoginUrl",
    "/api/users/autoLogin",
    "/api/users/filteredUsersStatuses",
    "/api/users/:id",
    "/api/orders/:id",
    "/api/users/affiliate",
    "/api/users/affiliateUsers",
    "/api/withdrawHistory/:id",
    "/api/withdrawHistory/update/:id",
    "/api/users/password/:id",
    "/api/users/status/:id",
    "/socket.io"
  ];
  if (nonSecurePaths.includes(req.path)) return next();
  // Bearer TOKEN
  // get the token from the req
  const authHeader = req.header("authorization");
  const authToken = authHeader && authHeader.split(" ")[1];

  if (authToken == null) return res.status(401).json("ACCESS DENIED");

  try {
    const response = JWT.verify(authToken, process.env.JWTSECRET, (error, user) => {
      if (error) { return 'token expired' }
      

      req.user = user;
      next();
    });
    if (response === 'token expired') {
      return res.send({status: 'error', data: 'token expired'})
    }
  } catch (error) {
    return res.status(500).json(error)
  }
  // verify the token
}

module.exports = {
  generateAccessToken,
  verifyToken,
};
