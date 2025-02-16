import React, { useState, useEffect } from "react";
import LeadSourceService from "../../../services/leadSourceService";
import { X, Pencil, Plus, Check, AlertCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";


const Modal = ({ isOpen, onClose, title, onSubmit, children, isLoading }) => {
  // If the modal is not open, return null (don't render anything)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/40 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content (Children) */}
        {children}

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

const LeadSource = () => {
  const [leadSources, setLeadSources] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedLeadSource, setSelectedLeadSource] = useState(null);
  const [newLeadSourceName, setNewLeadSourceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchLeadSources();
  }, []);

  const fetchLeadSources = async () => {
    try {
      setIsLoading(true);
      const response = await LeadSourceService.getAllLeadSources();
      console.log("response.data", response.data);
      setLeadSources(response.data);
    } catch (error) {
      // setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLeadSource = async () => {
    try {
      if (!newLeadSourceName.trim()) {
        // setError("Lead source name is required");
        toast.error("Lead source name is required");
        
        return;
      }
      setIsLoading(true);
      await LeadSourceService.addLeadSource({ name: newLeadSourceName });
      // setSuccess("Lead source created successfully");
      toast.success("Lead source created successfully")
      setIsCreateModalOpen(false);
      setNewLeadSourceName("");
      fetchLeadSources();
    } catch (error) {
      // setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLeadSource = async () => {
    try {
      if (!newLeadSourceName.trim()) {
        // setError("Lead source name is required");
        toast.error("Lead source name is required")
        return;
      }
      setIsLoading(true);
      await LeadSourceService.updateLeadSource(selectedLeadSource._id, {
        name: newLeadSourceName,
      });
      // setSuccess("Lead source updated successfully");
      toast.success("Lead source updated successfully");
      setIsUpdateModalOpen(false);
      setSelectedLeadSource(null);
      setNewLeadSourceName("");
      fetchLeadSources();
    } catch (error) {
      // setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (leadSource) => {
    try {
      setIsLoading(true);
      await LeadSourceService.toggleActiveLeadSource(leadSource._id);
      toast.success(
        `Lead source ${
          leadSource.isActive ? "deactivated" : "activated"
        } successfully`
      );
      fetchLeadSources();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ isActive, onToggle, disabled }) => (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isActive ? "bg-blue-600" : "bg-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div>
            <ToastContainer position="top-center" style={{marginTop:"50px"}} autoClose={3000} />
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Lead Sources</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Lead Source
            </button>
          </div>

          {/* Alerts
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
              <Check size={20} />
              {success}
            </div>
          )} */}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leadSources.map((source) => (
                  <tr key={source._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {source.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm ${
                            source.isActive ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {source.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 flex gap-x-4 py-4">
                      <button
                        onClick={() => {
                          setSelectedLeadSource(source);
                          setNewLeadSourceName(source.name);
                          setIsUpdateModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <ToggleSwitch
                        isActive={source.isActive}
                        onToggle={() => handleToggleStatus(source)}
                        disabled={isLoading}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Lead Source"
        onSubmit={handleCreateLeadSource}
      >
        <input
          type="text"
          value={newLeadSourceName}
          onChange={(e) => setNewLeadSourceName(e.target.value)}
          placeholder="Enter lead source name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </Modal>

      {/* Update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update Lead Source"
        onSubmit={handleUpdateLeadSource}
      >
        <input
          type="text"
          value={newLeadSourceName}
          onChange={(e) => setNewLeadSourceName(e.target.value)}
          placeholder="Enter lead source name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </Modal>
    </div>
  );
};
export default LeadSource;
