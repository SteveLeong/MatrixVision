import React from "react";
import { Icon } from "antd";

const NavBar = props => {
  return (
    <header className="main">
      <a href="/">MatrixVision</a>
      <nav className="navbar">
        <ul>
          <li>
            <a
              href="https://github.com/SteveLeong"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="github" className="navicons" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/steven-leong/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="linkedin" className="navicons" />
            </a>
          </li>
          <li>
            <a
              href="https://steveleong.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="folder-open" className="navicons" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
