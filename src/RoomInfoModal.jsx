import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/solid";

const RoomInfo = ({ active, isOpen, handleClose }) => {
  return (
    <div
      className={`absolute ${
        isOpen ? "h-full p-8" : "h-0 overflow-hidden"
      } w-full bg-white z-50 flex flex-col items-center justify-center transition-all duration-300`}
    >
      <XMarkIcon
        className="size-10 absolute top-12 left-12 md:top-24 md:left-24"
        onClick={handleClose}
      />
      {/* Room Image */}
      <img
        src={active.image_url}
        alt={`${active.name} thumbnail`}
        className="w-32 h-32 rounded-full mb-6"
      />
      {/* Room Name */}
      <h2 className="text-3xl font-semibold mb-4">{active.name}</h2>
      <div className="text-lg text-slate-500 rounded-full border border-slate-500 px-2">
        Group chat room
      </div>

      <div className="flex flex-col mt-12">
        <p className="text-lg font-semibold">
          Participants: {active.participant.length}
        </p>
        {active.participant.map((participant) => (
          <div key={participant.id} className="mt-2 text-center">
            {participant.name}
          </div>
        ))}
      </div>
    </div>
  );
};

RoomInfo.propTypes = {
  active: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    participant: PropTypes.array.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default RoomInfo;
