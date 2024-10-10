import PropTypes from "prop-types";
import {
  PaperAirplaneIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import RoomInfo from "./RoomInfoModal";

const ChatView = ({ active, closeChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  function convertTime(inputTimestamp) {
    const date = new Date(inputTimestamp);
    const hours = String(date.getHours()).padStart(2, 0);
    const mins = String(date.getMinutes()).padStart(2, 0);

    const formattedTime = `${hours}:${mins} WIB`;
    return formattedTime;
  }

  return (
    <div className="flex flex-col h-screen relative">
      {/* Room Info Modal */}
      <RoomInfo
        active={active.room}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />

      {/* Chat Header */}
      <div className="cursor-pointer flex gap-4 h-18 items-center px-8 py-6 border-slate-100 border-b bg-white">
        <ChevronLeftIcon className="size-8" onClick={closeChat} />
        <div
          className="flex gap-4 items-center"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={active.room.image_url}
            alt={`${active.room.name} thumbnail`}
            className="w-16 h-16 rounded-full"
          />
          <p className="text-xl font-medium">
            {active.room.name}
            {active.room.room_type === "group" &&
              ` (${active.room.participant.length})`}
          </p>
        </div>
      </div>

      {/* Scrollable Chat Section */}
      <div className="p-6 space-y-4 bg-purple-50 text-md flex-grow overflow-y-auto">
        {active.comments.map((comment) => (
          <div
            key={comment.id}
            className={`flex ${
              comment.sender !== "agent@mail.com"
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div
              className={`p-4 rounded-lg ${
                comment.sender !== "agent@mail.com"
                  ? "bg-gray-200"
                  : "bg-purple-500 text-white"
              }`}
            >
              {active.room.room_type === "group" && (
                <p className="font-semibold">
                  {
                    active.room.participant.find(
                      (part) => part.id === comment.sender
                    ).name
                  }
                </p>
              )}

              <p className="text-lg">{comment.message}</p>

              {comment.type === "file" && (
                <div className="space-y-2 mt-2">
                  <hr className="border border-slate-300" />
                  {comment.files.map((file, index) => {
                    if (file.file_type === "image") {
                      return (
                        <div
                          key={index}
                          className="h-64 w-64 overflow-hidden rounded"
                        >
                          <img
                            src={file.file_url}
                            alt={file.file_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      );
                    } else if (file.file_type === "mp4") {
                      return (
                        <video key={index} controls className="rounded">
                          <source src={file.file_url} type="video/mp4" />
                          Your browser does not support video tag.
                        </video>
                      );
                    } else if (file.file_type === "pdf") {
                      return (
                        <a
                          key={index}
                          href={file.file_url}
                          download={file.file_name}
                          className="underline font-semibold flex gap-2"
                        >
                          <DocumentIcon className="size-6" />
                          {file.file_name}
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              <p
                className={`${
                  comment.sender !== "agent@mail.com" ? "text-right" : ""
                } mt-4 text-sm text-grey-700/70`}
              >
                {convertTime(comment.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="w-full p-4 bg-slate-100 shadow-inner flex items-center justify-between">
        <input
          type="text"
          className="flex-grow px-4 py-3 rounded-full bg-white border border-gray-300 focus:outline-none"
          placeholder="Type a message..."
        />
        <button className="ml-4 p-4 bg-purple-500 text-white rounded-full hover:scale-105">
          <PaperAirplaneIcon className="size-6 -rotate-45" />
        </button>
      </div>
    </div>
  );
};

ChatView.propTypes = {
  active: PropTypes.object,
  closeChat: PropTypes.func,
};

export default ChatView;
