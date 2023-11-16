import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function WatchLater() {
  return (
    <div className="tooltip">
      <AiOutlineClockCircle className="watch-later-icon" />
      <span className="tooltiptextlater">A Regarder plus tard</span>
    </div>
  );
}
