import React from "react";
import "./DashBoard.css"; // Optional: Import your CSS styles here
// import LOgo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();

  const logout = (e) => {
    let token;
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("token") !== "undefined"
    ) {
      token = localStorage.getItem("token");
    }
    // dispatch(logoutRequest({ token: token }));
  };

  return (
    <nav id="sidebar" className="sidebar-wrapper sidebar-dark">
      <div
        className="sidebar-content simplebar-scrollable-y"
        data-simplebar="init"
        style={{ height: "calc(100% - 60px)" }}
      >
        <div className="simplebar-wrapper">
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset">
              <div
                className="simplebar-content-wrapper"
                tabIndex="0"
                role="region"
                aria-label="scrollable content"
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div className="simplebar-content" style={{ padding: 0 }}>
                  <div className="sidebar-brand active main-sidebar">
                    <a href="">
                      <img
                        src=""
                        height="50"
                        className="logo-light-mode"
                        alt=""
                      />
                    </a>
                  </div>

                  <ul className="sidebar-menu">
                    <li className={`sidebar-dropdown ${currentPath === "/Playlist" ? "active" : ""}`}>
                      <Link to="/playlist">
                        <i className="ti ti-home me-2"></i>Playlist
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="simplebar-placeholder"
            style={{ width: "300px", height: "780px" }}
          ></div>
        </div>
        <div
          className="simplebar-track simplebar-horizontal"
          style={{ visibility: "hidden" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{ width: 0, display: "none" }}
          ></div>
        </div>
        <div
          className="simplebar-track simplebar-vertical"
          style={{ visibility: "visible" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{
              height: "96px",
              display: "block",
              transform: "translate3d(0px, 136px, 0px)",
            }}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
