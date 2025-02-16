// LeadDetailsModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { X, Phone, Mail, User, Calendar, MessageCircle } from "lucide-react";

const LeadDetailsModal = ({ lead, onLeadClick, onClose, onAddFollowUp }) => {
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [conclusion, setConclusion] = useState("");
  // const followUpsRef = useRef(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // useEffect(() => {
  //   // If the modal is opened via follow-up button, show the form and scroll
  //   if (followUpsRef.current) {
  //     followUpsRef.current.scrollIntoView({ behavior: "smooth" });
  //     setShowFollowUpForm(true);
  //   }
  // }, []);

  const handleSubmitFollowUp = (e) => {
    e.preventDefault();
    onAddFollowUp(lead._id, conclusion);
    setConclusion("");
    setShowFollowUpForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/40 bg-opacity-40">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Lead Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {/* Status */}
          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium 
              ${
                lead.status === "New"
                  ? "bg-blue-100 text-blue-800"
                  : lead.status === "Contacted"
                  ? "bg-yellow-100 text-yellow-800"
                  : lead.status === "Qualified"
                  ? "bg-green-100 text-green-800"
                  : lead.status === "Converted"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {lead.status}
            </span>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {lead.contact?.name}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} />
                <span className="font-semibold">Phone:</span>{" "}
                {lead.contact?.phoneNo}
              </div>
              {lead.contact?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span className="font-semibold">Email:</span>{" "}
                  {lead.contact?.email}
                </div>
              )}
            </div>
          </div>

          {/* Lead Source & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-md font-medium mb-2">Label</h3>
              <div className="bg-gray-50 p-3 rounded-lg">{lead.for?.name}</div>
            </div>
            <div>
              <h3 className="text-md font-medium mb-2">Lead Source</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                {lead.source?.name}
              </div>
            </div>
          </div>

          {/* Reference Information */}
          {lead.reference && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                Reference Information
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                {lead.reference.name && (
                  <div className="mb-2">
                    <span className="font-semibold">Name:</span>{" "}
                    {lead.reference.name}
                  </div>
                )}
                {lead.reference.phoneNo && (
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={16} />
                    <span className="font-semibold">Phone:</span>{" "}
                    {lead.reference.phoneNo}
                  </div>
                )}
                {lead.reference.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span className="font-semibold">Email:</span>{" "}
                    {lead.reference.email}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Assignment & Creation Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-md font-medium mb-2">Created Information</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} />
                  <span>Created by: {lead.createdBy?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Date: {formatDate(lead.createdAt)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium mb-2">Assignment</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>
                    Assigned to:{" "}
                    {lead?.assignedTo?.user?.name || "Not assigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks */}
          {lead.remark && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Remarks</h3>
              <div className="bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                {lead.remark}
              </div>
            </div>
          )}

          {/* Follow-ups */}
          <div className="mb-4">
            {lead.followUps && lead.followUps.length > 0 ? (
              <div className="space-y-3">
                {lead.followUps.map((followUp) => (
                  <div key={followUp._id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2 text-sm">
                        <MessageCircle size={16} />
                        <span className="font-medium">
                          Follow-up #{followUp.sequence}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(followUp.date)}
                      </span>
                    </div>
                    <p className="text-sm">{followUp.conclusion}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">
                No follow-ups recorded yet.
              </div>
            )}
            <div
              className="flex justify-between items-center mt-3 mb-2"
              // ref={followUpsRef}
            >
              <h3 className="text-lg font-medium">Follow-ups</h3>
              <button
                onClick={() => setShowFollowUpForm(!showFollowUpForm)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add Follow-up
              </button>
            </div>

            {showFollowUpForm && (
              <form
                onSubmit={handleSubmitFollowUp}
                className="mb-4 bg-gray-50 p-3 rounded-lg"
              >
                <textarea
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  placeholder="Enter follow-up conclusion..."
                  className="w-full h-20 p-2 border rounded mb-2"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFollowUpForm(false)}
                    className="px-3 py-1 text-sm border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
