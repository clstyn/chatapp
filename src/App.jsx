import { useEffect, useState } from "react";
import "./App.css";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import {
  Cog6ToothIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import ChatView from "./ChatView";

function App() {
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/response.json");
        const data = await res.json();
        setChatData(data.results || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(chatData);
  }, [chatData]);
  useEffect(() => {
    console.log(activeRoom);
  }, [activeRoom]);

  return (
    <div className="flex h-screen max-w-full relative overflow-hidden">
      {/* Navbar */}
      <div className="w-24 shadow-lg flex flex-col justify-between p-3">
        <div>
          <div className="w-full aspect-square flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl">
            KC
          </div>
          <div className="flex flex-col gap-10 w-full p-4 mt-16">
            <ChatBubbleBottomCenterTextIcon className="size-10 text-purple-500" />
            <CalendarIcon className="size-10" />
            <MagnifyingGlassIcon className="size-10" />
            <StarIcon className="size-10" />
          </div>
        </div>

        <div className="mx-auto">
          <Cog6ToothIcon className="size-10" />
        </div>
      </div>

      {/* Chat List */}
      <div className="w-1/3 border-r border-slate-100">
        <div className="border-b border-slate-100 p-6">
          <p className="font-semibold text-2xl ">Messages</p>
        </div>
        <div className="p-6">
          <input
            type="text"
            className="w-full rounded-full bg-[#f3f3f3] p-4"
            placeholder="Search rooms"
          />
        </div>
        <div className="flex-1">
          {loading ? (
            <div className="p-6">
              <p>Loading messages...</p>
            </div>
          ) : chatData.length > 0 ? (
            <ul className="p-6">
              {chatData.map((item) => (
                <li
                  key={item.room.id}
                  className={`flex text-xl p-4 cursor-pointer ${
                    activeRoom === item.room.id ? "bg-purple-100" : ""
                  }`}
                  onClick={() => setActiveRoom(item.room.id)}
                >
                  <img
                    src={item.room.image_url}
                    alt={`${item.room.name} thumbnail`}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.room.name}</p>
                    <p className="text-md text-gray-500">
                      {item.comments[item.comments.length - 1].message}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6">
              <p>No messages available.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        {activeRoom ? (
          <ChatView
            active={chatData.find((item) => item.room.id === activeRoom)}
          ></ChatView>
        ) : (
          <div className="flex h-full items-center justify-center bg-purple-50">
            <p className="text-lg text-slate-500">No chat selected.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
