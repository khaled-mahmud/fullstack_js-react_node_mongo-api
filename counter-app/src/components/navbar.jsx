import React, { Component } from "react";

const NavBar = ({ totalCounters }) => {
  console.log("NavBar - rendered");

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar{" "}
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

/*class NavBar extends Component {
  render() {
    
  }
}*/

export default NavBar;
