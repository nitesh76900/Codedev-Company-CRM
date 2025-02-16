const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRole");
const { verifyCompany, getVerifiedCompanies, getUnverifiedCompanies, toggleCompanyStatus, getAllCompanies } = require("../controllers/superAdmin.controller");

const router = express.Router();

router.put("/company/verify/:companyId", authMiddleware, checkRole("SuperAdmin"), verifyCompany)
router.get("/company/verify", authMiddleware, checkRole("SuperAdmin"), getVerifiedCompanies)
router.get("/company/unverify", authMiddleware, checkRole("SuperAdmin"), getUnverifiedCompanies)
router.patch("/company/change-status", authMiddleware, checkRole("SuperAdmin"), toggleCompanyStatus)
router.get("/company/all", authMiddleware, checkRole("SuperAdmin"), getAllCompanies)

module.exports = router;
