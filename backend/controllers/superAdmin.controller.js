const Company = require("../models/company.model");
const sendEmail = require("../utils/sendMail");

// 🔹 Common function to fetch companies based on verification status
const fetchCompanies = async (status, res, message) => {
    try {
        const companies = await Company.find({ verify: status, isActive: true }).populate("owner").populate("employees");
        if (!companies.length) return res.status(404).json({ message });

        return res.status(200).json({ message: `${status} companies fetched successfully`, data: companies });
    } catch (error) {
        console.error(`Fetch ${status} Companies Error:`, error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Verify Company & Notify Owner
exports.verifyCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        // 🔹 Find company and populate owner details
        const company = await Company.findById(companyId).populate("owner");
        if (!company) return res.status(404).json({ message: "Company not found" });

        // 🔹 Check if already verified
        if (company.verify === "Verify") {
            return res.status(400).json({ message: "Company is already verified" });
        }

        // 🔹 Update verification status
        company.verify = "Verify";
        company.verifyBy = req.user._id;
        await company.save();

        // 🔹 Send Verification Email to Company Owner
        const subject = "Company Verified Successfully";
        const message = `Dear ${company.owner.name},\n\nYour company "${company.name}" has been successfully verified.\n\nYou can now access all features.\n\nBest regards,\nSupport Team`;

        await sendEmail(company.owner.email, subject, message);

        return res.status(200).json({ message: "Company verified successfully, email sent to owner", company });
    } catch (error) {
        console.error("Verify Company Error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Fetch Unverified Companies
exports.getUnverifiedCompanies = (req, res) => fetchCompanies({ $ne: "Verify" }, res, "No unverified companies found");

// ✅ Fetch Verified Companies
exports.getVerifiedCompanies = (req, res) => fetchCompanies("Verify", res, "No verified companies found");

// ✅ Toggle Company `isActive` Status
exports.toggleCompanyStatus = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const { companyId } = req.body;

        // 🔹 Find company
        const company = await Company.findById(companyId);
        if (!company) return res.status(404).json({ message: "Company not found" });

        // 🔹 Toggle `isActive` status
        company.isActive = !company.isActive;
        await company.save();

        return res.status(200).json({ 
            message: `Company is now ${company.isActive ? "Active" : "Inactive"}`, 
            company 
        });

    } catch (error) {
        console.error("Toggle Company Status Error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// ✅ get all Companies 
exports.getAllCompanies  = async (req, res) => {
    try {
        // 🔹 Find company
        const company = await Company.find().populate("owner", "name email phoneNo");
        if (!company) return res.status(404).json({ message: "Company not found" });

        return res.status(200).json({ 
            message: `Companies fetched successfully `, 
            company 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};
