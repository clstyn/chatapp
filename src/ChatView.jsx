import PropTypes from "prop-types";
import {
  PaperAirplaneIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import RoomInfo from "./RoomInfoModal";

const ChatView = ({ active, closeChat }) => {
  const [isOpen, setIsOpen] = useState(false);

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
            {active.room.name} ({active.room.participant.length})
          </p>
        </div>
      </div>

      {/* Scrollable Chat Section */}
      <div className="p-6 space-y-4 bg-purple-50 text-md flex-grow overflow-y-auto">
        {active.comments.map((comment) => (
          <div
            key={comment.id}
            className={`flex ${
              comment.sender === "customer@mail.com"
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div
              className={`p-4 rounded-lg ${
                comment.sender === "customer@mail.com"
                  ? "bg-gray-200"
                  : "bg-purple-500 text-white"
              }`}
            >
              <p className="font-semibold">
                {
                  active.room.participant.find(
                    (part) => part.id === comment.sender
                  ).name
                }
              </p>
              <p className="text-lg">{comment.message}</p>
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
