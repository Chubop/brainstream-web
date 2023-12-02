import React from "react";
import HeaderButtonGroup from "./header-button-group";

interface HeaderButtonsProps {}

const HeaderButtons: React.FC<HeaderButtonsProps> = ({}) => {
  return (
    <div className="flex space-x-2">
      <HeaderButtonGroup />
    </div>
  );
};

export default HeaderButtons;
