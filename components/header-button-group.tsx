"use client";

import { useState } from "react";
import { ReactNode } from "react";
import HeaderButton from "./header-button";
import { IconCalendar, IconHome } from "./ui/icons";

function HeaderButtonGroup() {
  const [hover, setHover] = useState(false);

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="w-full"
    >
      <HeaderButton href="/" icon={<IconHome />} groupHover={hover}>
        Homepage
      </HeaderButton>
      <HeaderButton href="/timeline" icon={<IconCalendar />} groupHover={hover}>
        Timeline
      </HeaderButton>
    </div>
  );
}

export default HeaderButtonGroup;
