import React, { useEffect, useState } from "react";
import {
  getAllCompanies,
  getVerifiedCompanies,
  getUnverifiedCompanies,
  verifyCompany,
  toggleCompanyStatus,
} from "../../services/superAdminServices";
import { Tabs, Tab } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getAllCompanies();
      setCompanies(response.company);
      console.log(response);
      toast.success("Fetch company successfully");
      filterCompanies(response.company, tab);
    } catch (error) {
      toast.error("Error fetching companies:", error);
    }
  };

  const handleVerify = async (companyId) => {
    try {
      await verifyCompany(companyId);
      toast.success("Verify company successfully");
      fetchCompanies();
    } catch (error) {
      console.error("Error verifying company:", error);
      toast.error("Error verifying company:", error);
    }
  };

  const handleToggleStatus = async (companyId) => {
    try {
      await toggleCompanyStatus(companyId);
      toast.success("Change company status successfully");

      fetchCompanies();
    } catch (error) {
      console.error("Error toggling company status:", error);
      toast.error("Error toggling company status:", error);
    }
  };

  const filterCompanies = (companies, filter) => {
    if (filter === "verified") {
      setFilteredCompanies(companies.filter((c) => c.verify === "Verify"));
    } else if (filter === "unverified") {
      setFilteredCompanies(companies.filter((c) => c.verify !== "Verify"));
    } else {
      setFilteredCompanies(companies);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    filterCompanies(companies, newValue);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        style={{ marginTop: "50px" }}
        autoClose={3000}
      />
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="All Companies" value="all" />
          <Tab label="Verified Companies" value="verified" />
          <Tab label="Unverified Companies" value="unverified" />
        </Tabs>

        <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-4 text-left">Company Name</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company._id} className="border-b hover:bg-gray-100">
                  <td className="p-4">{company.name}</td>
                  <td className="p-4 font-medium">
                    {company.verify === "Verify" ? (
                      <span className="text-green-600">Verified</span>
                    ) : (
                      <span className="text-red-600">Unverified</span>
                    )}
                  </td>
                  <td className="p-4 flex gap-2">
                    {company.verify !== "Verify" && (
                      <button
                        className="px-4 py-2 rounded text-white transition bg-green-500 hover:bg-green-600"
                        onClick={() => handleVerify(company._id)}
                      >
                        Verify
                      </button>
                    )}

                    <button
                      className={`px-4 py-2 rounded text-white transition ${
                        company.isActive
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={() => handleToggleStatus(company._id)}
                    >
                      {company.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
