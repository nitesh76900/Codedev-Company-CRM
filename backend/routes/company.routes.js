const express = require("express");
const { getCompanies } = require("../controllers/company.controller");
const authMiddleware = require("../middleware/authMiddleware");
const checkActiveStatus = require("../middleware/checkActiveStatus");

const router = express.Router();


// company employee
router.use("/employee", authMiddleware, checkActiveStatus, require("./companyRoutes/employees.routes") )

// company role
// router.use("/role", authMiddleware, checkActiveStatus, require("./companyRoutes/role.routes") )

// leadFor
router.use("/lead-for", authMiddleware, checkActiveStatus, require("./companyRoutes/leadFor.routes") )

// leadSource
router.use("/lead-source", authMiddleware, checkActiveStatus, require("./companyRoutes/leadSource.routes") )

// leadStatusLabel
// router.use("/lead-status", authMiddleware, checkActiveStatus, require("./companyRoutes/leadStatusLabel.routes") )

router.get("/", getCompanies)



module.exports = router;
