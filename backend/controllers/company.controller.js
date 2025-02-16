const Company = require("../models/company.model");

// ✅ Fetch All Verified & Active Companies
exports.getCompanies = async (req, res) => {
    try {
        // 🔹 Find companies where `verify` is "Verify" and `isActive` is `true`
        const companies = await Company.find(
            { verify: "Verify", isActive: true },
            { name: 1, owner: 1 } // Select only `name` and `owner`
        ).populate("owner", "name"); // Populate only owner's name

        // 🔹 Check if there are any matching companies
        if (companies.length === 0) {
            return res.status(404).json({ message: "No verified and active companies found" });
        }

        return res.status(200).json({ message: "Verified and active companies fetched successfully", data: companies });

    } catch (error) {
        console.error("Fetch Verified & Active Companies Error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};



