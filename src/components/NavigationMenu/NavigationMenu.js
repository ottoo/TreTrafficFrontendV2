import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

import "./NavigationMenu.css";

class NavigationMenu extends Component {
  render() {
    return (
      <nav>
        <Menu>
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
        </Menu>
        <div className="menu">
          <h1>TreTraffic</h1>
        </div>
      </nav>
    );
  }
}

export default NavigationMenu;
