import { Container } from "react-bootstrap";
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


function App() {

  return (
    
        <AuthProvider>
            <Routes>

                <Route path="/" element={ <Signup /> } />
                <Route path="/login" element={ <Login /> } />          
                <Route path="/forgot-password" element={ <ForgotPassword /> } />                
                <Route path="/user" element={ 
                  <ProtectedRoute>
                    <Profile/> 
                  </ProtectedRoute> } />
                <Route path="/update-profile" element={ <ProtectedRoute>
                    <UpdateProfile /> 
                  </ProtectedRoute>  } />  
                  <Route path="/dashboard" element={ <ProtectedRoute>
                    <Dashboard /> 
                  </ProtectedRoute>  } /> 
                             
            </Routes>
        </AuthProvider>
    
  )

}

export default App;

