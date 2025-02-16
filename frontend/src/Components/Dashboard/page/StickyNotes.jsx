import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import { Trash2 } from "lucide-react";
import {
  getStickyNotes,
  deleteStickyNote,
} from "../../../services/stickyNotesServices";
import stickyNotesBG from "../bgImage/stickyNotesBG.png";
import { Tooltip } from "react-tooltip";
const StickyNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getStickyNotes();
      if (response.success) {
        setNotes(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteStickyNote(id);
      // After successful deletion, update the UI
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Function to format title and description from message
  const formatNoteContent = (message) => {
    if (message.includes(" - Scheduled for:")) {
      const [title, description] = message.split(" - Scheduled for:");
      return {
        title: title,
        description: `Scheduled for:${description}`,
      };
    }
    return {
      title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
      description: message,
    };
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Sticky Notes</h2>
      <div className="flex gap-5 flex-wrap">
        {notes.map((note) => {
          const { title, description } = formatNoteContent(note.message);
          return (
            <StickyBox
              key={note._id}
              className="w-[150px] h-[150px] p-2 rounded"
              style={{ backgroundImage: `url(${stickyNotesBG})`,
              backgroundSize: "150px 150px"
             }}
            >
              <div className="flex justify-between items-center">
                <p className=" px-2 rounded-2xl text-[10px] font-bold bg-amber-100 mt-2 text-center">
                  {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                </p>
                <p className=" hover:text-red-700" data-tooltip-id="delete-note"  data-tooltip-content="Delete Sticky Note" onClick={() => deleteNote(note._id)}>
                  <Trash2 size={16} />
                </p>
                <Tooltip id="delete-note" />
              </div>
              <h1 className="font-bold text-[15px] word-break: break-all">{title}</h1>
              {/* <p className=" text-[12px]">{description}</p> */}
            </StickyBox>
          );
        })}
      </div>
    </div>
  );
};

export default StickyNotes;
