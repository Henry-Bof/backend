JWT = require("jsonwebtoken");

function generateAccessToken(user) {
  return JWT.sign(user, process.env.JWTSECRET, { expiresIn: "10h" });
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
    "/api/users/allUsers",
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

  console.log(authToken);
  if (authToken == null) return res.status(401).json("ACCESS DENIED");

  // verify the token
  JWT.verify(authToken, process.env.JWTSECRET, (error, user) => {
    if (!error) return res.status(403).json("SESSION EXPIRED! Please logout and login again.");
    console.log(error);
    req.user = user;
    next();
  });
}

module.exports = {
  generateAccessToken,
  verifyToken,
};
