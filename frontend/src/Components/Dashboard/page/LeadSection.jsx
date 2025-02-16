import React, { useState } from "react";

const LeadSection = ({ leads }) => {
  const [filter, setFilter] = useState("all");

  // Map leads to required format
  const formattedLeads =
    leads?.map((lead) => ({
      id: lead._id,
      name: lead.contact?.name || "Unknown",
      status: lead.status,
    })) || [];

  const filteredLeads =
    filter === "all"
      ? formattedLeads
      : formattedLeads.filter((lead) => lead.status.toLowerCase() === filter);

  return (
    <div className="w-[400px] h-[350px] overflow-y-auto px-6 py-2 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Leads</h2>
      <div className="flex space-x-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("new")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === "new"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          New
        </button>
        <button
          onClick={() => setFilter("contacted")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === "contacted"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Contacted
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === "closed"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Closed
        </button>
      </div>
      <ul className="space-y-3">
        {filteredLeads.map((lead) => (
          <li
            key={lead.id}
            className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
          >
            <span className="text-gray-700">{lead.name}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                lead.status.toLowerCase() === "new"
                  ? "bg-green-100 text-green-700"
                  : lead.status.toLowerCase() === "contacted"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {lead.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadSection;
