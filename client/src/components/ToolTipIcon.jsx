import React, { useState } from "react";

const ToolTipIcon = ({ Icon, TooltipText, size = 28 }) => {
  const [showToolTip, setShowToolTip] = useState(false);

  function ToolTipVisiblity() {
    if (!showToolTip) {
      setShowToolTip(true);

      setTimeout(() => {
        setShowToolTip(false);
      }, 1000);
    } else {
      setShowToolTip(false);
    }
  }

  //   toggle -> on - shows ; toggle -> off - doesn't show.
  // If OFF, it ONs then setimeout runs, but timeout uses old value not this new one, cause tis new one is implemented after function has run.

  return (
    <div>
      <div className="relative group">
        {/* Icon */}
        <Icon
          size={size}
          className="text-brown-400 shrink-0"
          //   on cliking tooltip shows / hides
          onClick={ToolTipVisiblity}
        />

        {/* Tooltip */}
        <span
          className={`tooltip  absolute -top-8 -left-4 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 ${
            showToolTip ? "opacity-100" : ""
          }`}
        >
          {TooltipText}
        </span>
      </div>
    </div>
  );
};

export default ToolTipIcon;
