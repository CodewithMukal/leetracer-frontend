import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { VerifyOTP } from "./VerifyOTP";
import { Dashboard } from "./Dashboard";
import { VerifyLeetcode } from "./VerifyLeetcode";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/:paramEmail" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addLeetcode" element={<VerifyLeetcode/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
