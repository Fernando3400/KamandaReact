import '../assets/style/hamburger-menu.modules.css';
import { useState } from "react";
import hamburgerMenuIcon from '../assets/img/hamburger-menu.png';
import SideBarMenu from "./SideBarMenu";

function HamburgerMenu() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <img
        src={hamburgerMenuIcon}
        onClick={() => setSidebarOpen(! isSidebarOpen)}
        alt="Menu do tipo hamburger"
        className="hamburger-menu-icon"
      />
      {isSidebarOpen && (
        <SideBarMenu
          className={`nav ${isSidebarOpen}` ? "nav-open" : "nav-closed"}
          hamburgerMenuIcon={hamburgerMenuIcon}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar} 
        />
      )}
    </>
  );
}

export default HamburgerMenu;
