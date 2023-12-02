"use client";

import { useState } from "react";
import { ReactNode } from "react";
import HeaderButton from "./header-button";
import { IconHome } from "./ui/icons";

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
      <HeaderButton href="/" icon={<IconHome />} groupHover={hover}>
        Settings
      </HeaderButton>
    </div>
  );
}

export default HeaderButtonGroup;
