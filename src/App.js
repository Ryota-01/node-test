import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import User from "./User";
import UserInfo from "./UserInfo";
import UserEdit from "./UserEdit";
import AdminLogin from "./AdminLogin";
import UserCreate from "./UserCreate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/usercreate" element={<UserCreate />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/useredit/:id" element={<UserEdit />} />
      </Routes>
    </div>
  );
}

export default App;
