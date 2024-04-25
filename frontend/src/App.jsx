import { useState } from "react";
import Loginpage from "./pages/loginpage";
import Registerpage from "./pages/registerpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settingspage from "./pages/settingspage";
import Resetpassword from "./pages/resetpassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/settings" element={<Settingspage />} />
        <Route path="/resetpassword/:token" element={<Resetpassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
