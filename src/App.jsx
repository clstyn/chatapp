import { useEffect, useState } from "react";
import "./App.css";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import {
  Cog6ToothIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  StarIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import ChatView from "./ChatView";

function App() {
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
      <div
        className={`${
          mobileNavOpen
            ? "max-md:w-1/4 max-md:items-center"
            : "max-md:w-0 max-md:overflow-hidden max-md:p-0"
        } w-24 shadow-lg flex flex-col justify-between p-3 transition-width duration-300`}
      >
        <div>
          <div className="w-full aspect-square flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl">
            AA
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
      <div className="w-full h-screen md:w-1/3 border-r border-slate-100">
        <div className="md:hidden px-6 pt-6">
          <Bars3Icon
            className="size-10"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          />
        </div>

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
                  className={`flex gap-4 md:gap-6 text-xl md:p-4 cursor-pointer ${
                    activeRoom === item.room.id ? "bg-purple-100" : ""
                  }`}
                  onClick={() => {
                    setActiveRoom(item.room.id);
                  }}
                >
                  <img
                    src={item.room.image_url}
                    alt={`${item.room.name} thumbnail`}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="w-3/4">
                    <p className="font-semibold">{item.room.name}</p>
                    <p className="text-md text-gray-500 truncate">
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

      <div
        className={`${
          activeRoom
            ? "max-md:absolute max-md:top-0 max-md:left-0"
            : "max-md:hidden"
        } flex-1`}
      >
        {activeRoom ? (
          <ChatView
            active={chatData.find((item) => item.room.id === activeRoom)}
            closeChat={() => {
              setActiveRoom(null);
            }}
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
