import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";
import Login from "./userComponent/login";
import Registration from "./userComponent/registration";
import { store } from "./Store/index";
import DashBoard from "./DashBoard/mainFile";
import SongSearch from "./DashBoard/search";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes: Accessible when user is NOT authenticated */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>

          {/* Protected Routes: Accessible when user IS authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/playlist" element={<DashBoard />} />
            <Route path="/search/:playlistId" element={<SongSearch />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
