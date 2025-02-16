import api from "./api";

// ✅ Fetch all employees
export const getAllEmployees = async () => {
  try {
    const response = await api.get("/company/employee/all");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ✅ Fetch verified employees
export const getVerifiedEmployees = async () => {
  try {
    const response = await api.get("/company/employee/verify");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ✅ Fetch unverified employees
export const getUnverifiedEmployees = async () => {
  try {
    const response = await api.get("/company/employee/unverify");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ✅ Fetch employee by ID
export const getEmployeeById = async (employeeId) => {
  try {
    const response = await api.get(`/company/employee/profile/${employeeId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ✅ Verify Employee and Assign Role
export const verifyEmployee = async (employeeId, roleName, permissions) => {
  try {
    const response = await api.post("/company/employee/verification", {
      employeeId,
      roleName,
      permissions,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ✅ Change Employee active Status
export const toggleEmployeeStatus = async (employeeId) => {
  try {
    console.log("Called");
    const response = await api.put(
      `/company/employee/change-active-status/${employeeId}`
    );
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
