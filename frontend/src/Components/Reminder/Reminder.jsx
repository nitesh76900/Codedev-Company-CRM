import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaTrash,
  FaSearch,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";
import {
  deleteReminder,
  getRemindersByDateRange,
} from "../../services/reminderServices";
import { addStickyNote } from "../../services/stickyNotesServices";
import { ToastContainer, toast } from "react-toastify";

const ReminderList = () => {
  const [clicked, setClicked] = useState(false);

  const [reminders, setReminders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    startDateTime: new Date().toISOString().split("T")[0],
    endDateTime: new Date().toISOString().split("T")[0],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchReminders();
  }, [dateRange]);

  const fetchReminders = async () => {
    try {
      const response = await getRemindersByDateRange(
        dateRange.startDateTime,
        dateRange.endDateTime
      );
      console.log("response", response.reminders);
      setReminders(response.reminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReminder(id);
      toast.success("Reminder deleted successfully!");
      fetchReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("Failed to delete reminder.");
    }
  };

  const handleAddStickyNote = async (reminder) => {
    try {
      const formattedDateTime = formatDateTime(reminder.dateTime);
      const noteMessage = `${reminder.message} - ${formattedDateTime}`;

      await addStickyNote({
        type: "reminder",
        message: noteMessage,
        url: window.location.pathname,
      });

      toast.success("Added to notes");
    } catch (error) {
      toast.error("Error adding sticky note: " + error.message);
    }
  };

  const filteredReminders = reminders.filter((reminder) =>
    reminder.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTypeLabel = (reminder) => {
    if (reminder.generated) {
      return (
        <span className="text-blue-600 text-xs">{`${reminder.type} (Generated)`}</span>
      );
    }
    return <span className="text-gray-600 text-xs">{reminder.type}</span>;
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        style={{ marginTop: "50px" }}
        autoClose={3000}
      />
      <div className="max-w-7xl mx-auto">
        {/* Keep existing header and search sections */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Reminders</h2>
          <button
            onClick={() => navigate("/reminderForm")}
            className="bg-blue-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            + New Reminder
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {/* Keep existing search and date range filters */}
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reminders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.startDateTime}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      startDateTime: e.target.value,
                    }))
                  }
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.endDateTime}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      endDateTime: e.target.value,
                    }))
                  }
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Schedule</th>
                <th className="px-4 py-3 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReminders.map((reminder) => (
                <tr key={reminder._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900 truncate max-w-md">
                      {reminder.message}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {getTypeLabel(reminder)}
                    {reminder.type === "Weekly" && reminder.days && (
                      <div className="text-xs text-gray-500 mt-1">
                        {reminder.days
                          .map(
                            (day) =>
                              ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                                day
                              ]
                          )
                          .join(", ")}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" size={12} />
                      <span className="text-xs text-gray-600">
                        {formatDateTime(reminder.dateTime)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleDelete(reminder._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Reminder"
                      >
                        <FaTrash size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setClicked(true);
                          handleAddStickyNote(reminder);
                          setTimeout(() => setClicked(false), 200);
                        }}
                        className="text-yellow-500 hover:text-red-700 transition-colors"
                        title="Save as Sticky"
                      >
                        <FaSave
                          className={`transition-transform duration-200 ${
                            clicked ? "scale-125" : "scale-100"
                          }`}
                          size={20}
                        />
                      </button>
                    </div>
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

export default ReminderList;
