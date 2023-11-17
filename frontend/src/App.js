import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LandingPage } from "./pages/landingPage/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgetPasswordPage } from "./pages/forget/ForgetPasswordPage";
import { ResetPasswordPage } from "./pages/forget/ResetPassword";
import { HomePage } from "./pages/home/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./endpoint/request";
import { setGetUser } from "./features/userReducer";
import LibrairiePage from "./pages/librairie/LibrairiePage";

function App() {
  const dispatch = useDispatch();
  // Utilisez une vérification supplémentaire ici

  useEffect(() => {
    getUser()
      .then((data) => {
        dispatch(setGetUser(data.user));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        // <CircleLoader />;
        // setTimeout(() => {
        //   history("/login");
        // }, 5000);
      });
  }, []); // Assurez-vous que useEffect dépend de userId pour être exécuté lorsque userId change

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
          <Route exact path="/my-library" element={<LibrairiePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
