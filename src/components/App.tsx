import { Container } from "react-bootstrap";
import '../../src/index'
import Signup from "./authentication/Signup";
import { AuthProvider} from "../contexts/AuthContext";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import ForgotPassword from "./authentication/ForgotPassword";
import ProtectedRoute from "./authentication/ProtectedRoute";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./google-drive/Dashboard";
import HomePage from "./google-drive/HomePage";





function App() {

  return (
        <AuthProvider>
            <Routes>
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile/*" element={<ProtectedRoute component={Profile} />} />
                <Route path="/update-profile/*" element={<ProtectedRoute component={UpdateProfile} />} />
                <Route path="/dashboard/*" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/folder/:folderId/*"element={<ProtectedRoute component={Dashboard} />} />                 
            </Routes>
        </AuthProvider>
  )
}
export default App;

