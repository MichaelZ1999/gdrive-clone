import "../../src/index";
import Signup from "./authentication/Signup";
import { AuthProvider } from "../contexts/AuthContext";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import ForgotPassword from "./authentication/ForgotPassword";
import ProtectedRoute from "./authentication/ProtectedRoute";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./google-drive/Dashboard";
import HomePage from "./google-drive/HomePage";
import UIExperimental from "./google-drive/UIExperimental";
import Sidebar from "./SideBar";
import Collector from "./Collector";
import AddFolderDrawer from "./google-drive/UpdateProfileDrawer";
import HomeContainer from "./HomeContainer";
import Folders from "./google-drive/Folders";
import Favorites from "./google-drive/Favorites";
import Trash from "./google-drive/Trash";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/home" element={<HomeContainer />}>
          <Route path="uiexperimental/*" element={<UIExperimental />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="update-profile/*" element={<UpdateProfile />} />
          <Route path="favorites/*" element={<Favorites />} />
          <Route path="trash/*" element={<Trash />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="folder/:folderId/*" element={<Folders />} />
          {/* <Route path="folder/:folderId/*"element={<ExistingFolders />} /> */}
        </Route>
        <Route path="/collector" element={<Collector />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home/*" element={<HomeContainer />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
