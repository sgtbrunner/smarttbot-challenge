import React from "react";

import "./Header.styles.css";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img
          src="https://www.smarttbot.com/wp-content/uploads/2018/02/sb-1.png"
          srcSet="https://www.smarttbot.com/wp-content/uploads/2018/02/sb-1.png 1x"
          alt="SmarttBot Logo"
          className="fusion-standard-logo"
        />
      </div>
    </div>
  );
};
