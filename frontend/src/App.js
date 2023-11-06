import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LandingPage } from "./pages/landingPage/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgetPasswordPage } from "./pages/forget/ForgetPasswordPage";
import { ResetPasswordPage } from "./pages/forget/ResetPassword";
import { HomePage } from "./pages/home/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          {/* <Route exact path="/" element={<HomePage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget_password" element={<ForgetPasswordPage />} />
          <Route path="/reset/:token" element={<ResetPasswordPage />} />
          <Route exact path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
