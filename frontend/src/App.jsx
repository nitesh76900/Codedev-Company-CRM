import { useState } from "react";
import Layout from "./Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router";
import CompanyRegistration from "./Components/Registration/CompanyRegistration";
import EmployeeRegistration from "./Components/Registration/EmployeeRegistration";
import Lead from './Components/Leads/Lead'
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import ResetPasswordForm from "./Components/Login/ResetPasswordForm";
import Roles from "./Components/Roles/Roles";
import EmployeeVerification from "./Components/EmployeeVerification/EmployeeVerification";
import ReminderList from './Components/Reminder/Reminder'
import ReminderForm from './Components/Reminder/ReminderForm'
import Settings from "./Components/Settings/Settings";
import LeadSource from "./Components/Settings/Leads/LeadSource";
import LeadStatusLabel from "./Components/Settings/Leads/LeadStatusLabel";
import RoleSettings from "./Components/Settings/Role Settings/RoleSettings";
import EmployeeSettings from "./Components/Settings/EmployeeSettings/EmployeeSettings";
import LeadPage from "./Components/Settings/Leads/LeadFor";
import Todo from "./Components/Todo/Todo";
import TaskAssign from "./Components/Task Assign/TaskAssign";
import EmployeeTasks from "./Components/EmployeeTask/EmployeeTask";
import Meetings from "./Components/Meetings/Meetings";
import Contacts from "./Components/Contacts/Contacts";
import SuperAdminDashboard from "./Components/SuperAdmin/SuperAdminDashboard"
import './App.css'
import ProtectedRoute from "./Middleware/ProtectedRoute";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/company-register" element={<CompanyRegistration />} />
          <Route path="/employee-register" element={<EmployeeRegistration />} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm/>} />

          <Route path="/lead" element={<ProtectedRoute><Layout><Lead /></Layout></ProtectedRoute>} />
          <Route path="/roles" element={<ProtectedRoute><Layout><Roles /></Layout></ProtectedRoute>} />
          <Route path="/reminder" element={<ProtectedRoute><Layout><ReminderList /></Layout></ProtectedRoute>} />
          <Route path="/reminderForm" element={<ProtectedRoute><Layout><ReminderForm /></Layout></ProtectedRoute>} />
          <Route path="/employee-verification" element={<ProtectedRoute><Layout><EmployeeVerification /></Layout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
          <Route path="/lead-for" element={<ProtectedRoute><Layout><LeadPage /></Layout></ProtectedRoute>} />
          <Route path="/lead-source" element={<ProtectedRoute><Layout><LeadSource /></Layout></ProtectedRoute>} />
          <Route path="/lead-status-label" element={<ProtectedRoute><Layout><LeadStatusLabel /></Layout></ProtectedRoute>} />
          <Route path="/role-settings" element={<ProtectedRoute><Layout><RoleSettings /></Layout></ProtectedRoute>} />
          <Route path="/employee-settings" element={<ProtectedRoute><Layout><EmployeeSettings /></Layout></ProtectedRoute>} />
          <Route path="/todo" element={<ProtectedRoute><Layout><Todo /></Layout></ProtectedRoute>} />
          <Route path="/assign-task" element={<ProtectedRoute><Layout><TaskAssign /></Layout></ProtectedRoute>} />
          <Route path="/employee-task" element={<ProtectedRoute><Layout><EmployeeTasks /></Layout></ProtectedRoute>} />
          <Route path="/meetings" element={<ProtectedRoute><Layout><Meetings /></Layout></ProtectedRoute>} />
          <Route path="/contacts" element={<ProtectedRoute><Layout><Contacts /></Layout></ProtectedRoute>} />
          <Route path="/super-admin-dashboard" element={<ProtectedRoute><Layout><SuperAdminDashboard /></Layout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
