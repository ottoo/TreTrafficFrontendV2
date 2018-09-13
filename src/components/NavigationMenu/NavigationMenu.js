import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { Button } from "antd";

import "./NavigationMenu.css";
import { inject, observer } from "mobx-react";

const getBtnStyle = (selected, busLine) => {
  const found = selected.find(s => s === busLine.name);
  return found ? "primary" : "default";
};

const BusLines = inject("store")(
  observer(({ store }) => {
    return (
      <div className="buslines">
        {store.busLines.map(b => (
          <Button
            key={b.name}
            type={getBtnStyle(store.selectedBusLines, b)}
            onClick={() => store.busLineStore.toggleSelectedBusLine(b.name)}
            className="buslinebtn"
          >
            {b.name}
          </Button>
        ))}
      </div>
    );
  })
);

class NavigationMenu extends Component {
  render() {
    return (
      <nav>
        <Menu>
          <BusLines />
        </Menu>
        <div className="menu">
          <h1>TreTraffic</h1>
        </div>
      </nav>
    );
  }
}

export default NavigationMenu;
