const { Router } = require("express");

const {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  getUser,
  changeUserPassword,
  changeUserBallance,
  changeUserProfit,
  changeUserEquity,
  changeUserFreeMargin,
  deleteUser,
  getUsersWithAffiliate,
  autoLoginUser,
  getAutoLoginUrl,
  getFilteredUsersAffiliate,
  changeUserLastLogon,
  addComment,
  changeUserStatus,
  getFilteredUserStatuses,
  changeUserAgent,
} = require("../controllers/userController");

const router = Router();

router.get("/allUsers", getUsers);
router.get("/affiliate", getUsersWithAffiliate);
router.get("/autoLoginUrl", getAutoLoginUrl);
router.get("/affiliateUsers", getFilteredUsersAffiliate);
router.get("/filteredUsersStatuses", getFilteredUserStatuses);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.post("/autoLogin", autoLoginUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.put("/password/:id", changeUserPassword);
router.put("/ballance/:id", changeUserBallance);
router.put("/agent/:id", changeUserAgent);
router.put("/status/:id", changeUserStatus);
router.put("/profit/:id", changeUserProfit);
router.put("/comment/:id", addComment);
router.put("/lastLogon/:id", changeUserLastLogon);
router.put("/equity/:id", changeUserEquity);
router.put("/freeMargin/:id", changeUserFreeMargin);

module.exports = router;
