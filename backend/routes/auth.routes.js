const express = require("express");
const { loginUser, registerEmployee, registerCompany, logout, getProfile, registerSuperAdmin, forgotPassword, checkToken, resetPassword } = require("../controllers/auth.controller");
const checkActiveStatus = require("../middleware/checkActiveStatus");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/register/company", upload.single("image") ,registerCompany);
router.post("/register/employee",upload.single("image"), registerEmployee);
router.post("/register/super-admin", registerSuperAdmin); // for postman
router.post("/login", loginUser);
router.get("/logout", authMiddleware, checkActiveStatus, logout);
router.get("/profile", authMiddleware, checkActiveStatus, getProfile);
router.post("/forgot-password", forgotPassword)
router.post("/check-token", checkToken)
router.put("/reset-password", resetPassword)

module.exports = router;
