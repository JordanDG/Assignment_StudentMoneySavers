import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
// Import Components //
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./page-components/PrivateRoute";
import Home from "./pages/Home";
import ReportProblemPage from "./pages/ReportProblemPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
// Router //
import GlobalStyle from "../theme/globalstyles";
// React-Router //
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function App() {
  const auth = useAuth();
  console.log(auth);
  return (
    <>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route>
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/update-profile" element={<UpdateProfile />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/report" element={<ReportProblemPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
