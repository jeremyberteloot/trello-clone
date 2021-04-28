import React from "react";
import Trolle from "../trolle.svg";

const Header = (props) => {
  return (
    <div className="fixed flex items-center justify-center w-full h-12 bg-purple-700">
      <img className="h-8" src={Trolle} alt="trolle" />
    </div>
  );
};

export default Header;
