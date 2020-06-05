import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <img className="logo" src={require("./logo.png")} alt="logo" />

        <p className="text">Food Bots</p>
      </header>
    );
  }
}

export default Navbar;
